import { createSchema } from './schema'
import { capitalize, isObject, stripS } from './utils'
import { validator } from './validate'
import c from "picocolors"
import { Config } from './types'

const config: Config = {
  schemaDir: 'schema',
}

export function jsonapiCheck(apiName: string, data: any, options = config) {
  if (!data) {
    console.error(`${c.red(`API ${apiName} is not responsed.`)}`)
    return
  }
  if (!isObject(data)) {
    return
  }
  const typeName = capitalize(stripS(apiName))
  const optionsConfig = Object.assign(config, options)
  createSchema(typeName, data, optionsConfig)
  validator(typeName, data, optionsConfig)
}
