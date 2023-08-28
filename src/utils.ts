import c from "picocolors"
import { OptionsConfig } from './types'

export function resolveOptionsConfig(path, config: OptionsConfig) {
  const { hasSubdirectory } = config
  const filePath = stripSlash(path)
  if(filePath === ''){
    console.error(`${c.red(`Path ${path} is not valid.`)}`)  
    return
  }
  if(filePath.includes('/')){
    const paths = filePath.split('/')
    if(hasSubdirectory){
      config.subdirectory = paths[0] || paths[1]
    }
    const lastPath = paths[paths.length - 1]
    const resPath = isNumber(parseInt(lastPath)) ? paths[paths.length - 2] : lastPath
    if(resPath === undefined || resPath === ''){
      console.error(`${c.red(`Path ${path} is not valid.`)}`)  
      return
    }
    const capPath = capitalize(resPath)
    config.type = stripS(capPath)
    config.fileName = capPath + '-' + config.method
  }else {
    if(hasSubdirectory){
      config.subdirectory = filePath
    }
    config.type = capitalize(stripS(filePath))
    config.fileName = capitalize(filePath) + '-' + config.method
  }
}

function stripSlash(s: string): string {
  return stripStartSlash(stripEndSlash(s))
}

function stripEndSlash(s: string): string {
  return s.endsWith('/') ? s.substring(0, s.length - 1) : s
}

function stripStartSlash(s: string): string {
  return s.startsWith('/') ? s.substring(1) : s
}

export function isObject(value): boolean {
  return value !== null && typeof value === 'object'
}

export const isArray = Array.isArray

function isNumber(value): boolean {
  return typeof value === 'number' && !isNaN(value)
}

export function getBaseType(value): string {
  return typeof value
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1)
}
    
export function stripS(s: string): string {
  return s.endsWith('s') ? s.substring(0, s.length - 1) : s
}

export const extend = Object.assign
