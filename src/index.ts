import { isObject, resolveOptionsConfig } from './utils'
import { Option, OptionsConfig } from './types'
import { createSchema } from './schema'
import { validator } from './validate'
import c from "picocolors"

const config: OptionsConfig = {
  schemaDir: 'schema',
  hasSubdirectory: false,
  subdirectory: '',
  type: '',
  fileName: ''
}

export function jsonapiCheck(apiName: string, data: any, options: Option) {
  if (!data) {
    console.error(`${c.red(`API ${apiName} is not responsed.`)}`)
    return
  }
  if (!isObject(data)) {
    return
  }

  const optionsConfig = Object.assign(config, options)

  resolveOptionsConfig(apiName, optionsConfig)
  createSchema(data, optionsConfig)
  validator(data, optionsConfig)
}
