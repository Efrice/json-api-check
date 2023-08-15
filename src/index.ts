import { createSchema } from './schema'
import { capitalize, stripS } from './utils'
import { validator } from './validate'
import pc from "picocolors"

export function jsonApiCheck(apiName: string, data: any) {
  if (!data) {
    console.error(`${pc.red(`API ${apiName} is not available`)}`)
  }
  const typeName = capitalize(stripS(apiName))
  createSchema(typeName, data)
  validator(typeName, data)
}
