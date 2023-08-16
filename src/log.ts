import c from "picocolors"
import { Error, Config } from './types'

export function printErrorLog(typeSchema: string, errors: Error[], options: Config) {
  const { schemaDir: schema } = options
  console.log()
  console.log(c.inverse(c.bold(c.red(` FAIL `))) + ` ${schema} > ${typeSchema}.ts `)
  errors.forEach((error) => {
    const { property, message } = error
    console.log(c.red(` ${property}: `) + c.red(` ${message} `))
  })
}
