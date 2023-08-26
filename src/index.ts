import { isObject, resolveOptionsConfig } from './utils'
import { Method, Option, OptionsConfig } from './types'
import { createSchema } from './schema'
import { validator } from './validate'
import c from "picocolors"

const config: OptionsConfig = {
  schemaDir: 'schema',
  hasSubdirectory: false,
  subdirectory: '',
  method: 'GET',
  type: '',
  fileName: ''
}

export function jsonapiCheck(path: string, method: Method, data: any, options?: Option) {
  if (!data) {
    console.error(`${c.red(`API ${path} is not responsed.`)}`)
    return
  }
  if (!isObject(data)) {
    return
  }

  config.method = method
  const optionsConfig = Object.assign(config, options)

  resolveOptionsConfig(path, optionsConfig)
  createSchema(data, optionsConfig)
  validator(data, optionsConfig)
}
