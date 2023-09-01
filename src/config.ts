import c from "picocolors"
import { OptionsConfig } from './types'
import { stripSlash, isNumber, capitalize, stripS  } from './utils'

export function resolveOptionsConfig(path, config: OptionsConfig) {
  const { hasSubdirs, isObjectArray } = config
  const filePath = stripSlash(path)
  if(filePath === ''){
    console.log(c.inverse(c.bold(c.red(` ERROR `))) + `${c.red(`Path ${path} is not valid.`)}`)
    return
  }
  if(filePath.includes('/')){
    const paths = filePath.split('/')
    if(hasSubdirs){
      config.subdirectory = paths[0] || paths[1]
    }
    const lastPath = paths[paths.length - 1]
    const resPath = isNumber(parseInt(lastPath)) ? stripS(paths[paths.length - 2]) : lastPath
    if(resPath === undefined || resPath === ''){
      console.log(c.inverse(c.bold(c.red(` ERROR `))) + `${c.red(`Path ${path} is not valid.`)}`)
      return
    }
    const capPath = capitalize(resPath)
    config.typeName = isObjectArray ? stripS(capPath) + 's' : stripS(capPath)
    config.fileName = capPath + '-' + config.method
  }else {
    if(hasSubdirs){
      config.subdirectory = filePath
    }
    config.typeName = isObjectArray ? capitalize(stripS(filePath)) + 's' : capitalize(stripS(filePath))
    config.fileName = capitalize(filePath) + '-' + config.method
  }
}
