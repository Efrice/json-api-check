import { OptionsConfig } from './types'

export function resolveOptionsConfig(apiName, config: OptionsConfig) {
  const { hasSubdirectory } = config
  if(apiName.includes('/')){
    const apiNames = apiName.split('/')
    if(hasSubdirectory){
      config.subdirectory = apiNames[0] || apiNames[1]
    }
    config.fileName = config.type = capitalize(stripS(apiNames[apiNames.length - 1]))
  }else {
    config.fileName = config.type = capitalize(stripS(apiName))
  }
}

export function isObject(value): boolean{
  return value !== null && typeof value === 'object'
}

export const isArray = Array.isArray

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
