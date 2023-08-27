import c from "picocolors"
import { Error, OptionsConfig } from './types'

export function printErrorLog(errors: Error[], options: OptionsConfig) {
  const { schemaDir: schema, hasSubdirectory, subdirectory, fileName } = options
  console.log()
  console.log(c.inverse(c.bold(c.red(` FAIL `))) + ` ${schema} > ` + `${hasSubdirectory && subdirectory ? subdirectory + ' > ' : ''}` + `${fileName}.ts `)
  errors.forEach((error) => {
    const { property, message } = error
    console.log(c.red(` ${property}: `) + c.red(` ${message} `))
  })
}
