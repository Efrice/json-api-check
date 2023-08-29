import c from "picocolors"
import { Error } from './types'

export function printErrorLog(filePath: string, errors: Error[]) {
  console.log()
  console.log(c.inverse(c.bold(c.red(` FAIL `))) + `${filePath}`)
  errors.forEach((error) => {
    const { lines, property, message } = error
    console.log(property ? c.red(`${property}:`) + c.red(` ${message} `) : c.red(` ${message} `))
    if(lines.length > 0){
      lines.forEach((line) => {
        console.log(line)
      })
      console.log()
    }
  })
}
