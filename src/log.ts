import c from "picocolors"
import { Error } from './types'

export function printErrorLog(filePath: string, errors: Error[]) {
  console.log()
  console.log(c.inverse(c.bold(c.red(` FAIL `))) + `${filePath}`)
  errors.forEach((error) => {
    const { line, property, message } = error
    console.log(c.red(` -> ${line}.${property}:`) + c.red(` ${message} `))
  })
}
