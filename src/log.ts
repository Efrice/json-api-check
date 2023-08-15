import c from "picocolors"
import { Error } from './validate'

export function printErrorLog(typeSchema: string, errors: Error[]) {  
  console.log()
  console.log(c.red(`> ${typeSchema}.ts`))
  console.log()
  errors.forEach((error) => {
    const { property, message } = error
    console.log(c.bold(c.red(` ${property}: `)) + c.red(` ${message} `))
  })
}
