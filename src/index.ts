import c from "picocolors"
import { Method, Option, OptionsConfig, Result } from './types'
import { isObject } from './utils'
import { resolveOptionsConfig } from './config'
import { createSchemaFile } from './schema'
import { validate } from './validate'

const config: OptionsConfig = {
  schemaDir: 'schema',
  hasSubdirectory: false,
  subdirectory: '',
  method: 'GET',
  typeName: '',
  fileName: '',
  isObjectArray: false
}

/**
 * Auto generate json schema file by request info ( path, method and response ) first time.
 * Then check type with the files next request. Of course, the schema files can rewrite.
 * @param {string} path The request path.
 * @param {Method} method The request method.
 * @param {any} data The response data.
 * @param {Option} options? The options to set output schemaDir and has subdirectory or not.
 * @return {Result | null} The result of check, will show the error filePath and detail message.
 */
export function jsonapiCheck(path: string, method: Method, data: any, options?: Option): Result | null {
  if (!data) {
    console.log(c.inverse(c.bold(c.red(` ERROR `))) + `${c.red(`API ${path} is not responsed.`)}`)
    console.log()
    return null
  }
  if (!isObject(data)) {
    console.log(c.inverse(c.bold(c.red(` ERROR `))) + `${c.red(`Responsed ${data} is not json.`)}`)
    console.log()
    return null
  }

  config.method = method
  config.isObjectArray = Array.isArray(data) && isObject(data[0]) 
  const optionsConfig = Object.assign(config, options)

  resolveOptionsConfig(path, optionsConfig)
  createSchemaFile(data, optionsConfig)
  return validate(data, optionsConfig)
}
