import { OptionsConfig } from './types'

export function resolveOptionsConfig(path, config: OptionsConfig) {
  const { hasSubdirectory } = config
  if(path.includes('/')){
    const paths = path.split('/')
    if(hasSubdirectory){
      config.subdirectory = paths[0] || paths[1]
    }
    const lastPath = paths[paths.length - 1]
    const resPath = isNumber(lastPath) ? paths[paths.length - 2] : lastPath
    const capPath = capitalize(resPath)
    config.type = stripS(capPath)
    config.fileName = config.method + '-' + capPath
  }else {
    config.type = capitalize(stripS(path))
    config.fileName = config.method + '-' + capitalize(path)
  }
}

export function isObject(value): boolean{
  return value !== null && typeof value === 'object'
}

export const isArray = Array.isArray

function isNumber(value){
  return typeof value === 'number'
}

export function getBaseType(value): string{
  return typeof value
}

export function capitalize(s: string): string{
  return s.charAt(0).toUpperCase() + s.slice(1)
}
    
export function stripS(s: string): string{
  return s.endsWith('s') ? s.substring(0, s.length - 1) : s
}

export const extend = Object.assign
