import fs from 'fs'
import path from 'node:path'
import { isArray, isObject, getBaseType, capitalize, stripS } from './utils'
import { Context, OptionsConfig } from './types'

export function createSchema(data, options: OptionsConfig){
  const { schemaDir: schema, hasSubdirectory, subdirectory, type, fileName } = options

  const schemaPath = path.resolve(`./${schema}`)
  if(!fs.existsSync(schemaPath)){
    fs.mkdirSync(schemaPath)
  }

  const subdirPath = path.resolve(`./${schema}/${subdirectory}`)
  if(hasSubdirectory && !fs.existsSync(subdirPath)){
    fs.mkdirSync(subdirPath)
  }

  const filePath = path.resolve(subdirectory ? subdirPath : schemaPath, `./${fileName}.ts`)
  const context = createInterface(type)
  const content = getContent(data, context, options)
  writeFile(filePath, content)
}

export function getContent(data: any, context: Context, options: OptionsConfig): string {
  const { type } = options
  if(isArray(data)){
    if(isObject(data[0])){
      const { interfaceStr, interfaceItems } = JsonType(data[0], context)
      options.type = type + 's'
      return `export type ${options.type} = ${type}[]\n` + interfaceStr + interfaceItems.join("\n")
    }else {
      return `export type ${type} = ${getBaseType(data[0])}[]`
    }
  }else {
    const { interfaceStr, interfaceItems } = JsonType(data, context)
    return interfaceStr + interfaceItems.join("\n")
  }
}

function writeFile(filePath: string, content: string) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content)
  }
}

export function createInterface(name: string): Context {
  const context = {
    interfaceStr: `export interface ${capitalize(stripS(name))} {\n`,
    interfaceItems: <any[]>[],
    join(str){
      context.interfaceStr += str
    },
    push(item){
      if(isArray(item)){
        context.interfaceItems.unshift(...item)
      }else {
        context.interfaceItems.unshift(item)
      }
      return context.interfaceItems
    }
  }
  return context
}

function JsonType(jsonObject: object, context: Context): Context {
  const { join, push } = context
  for (const key in jsonObject) {
    const value = jsonObject[key]
    if(isObject(value)){
      if(isArray(value)){
        if(isObject(value[0])){
          resolveArrayObject(join, push, key, value)
        }else {
          join(`  ${key}: ${getBaseType(value[0])}[]\n`)
        }
      }else {
        resolveArrayObject(join, push, key, value)
      }
    }else {
      join(`  ${key}: ${getBaseType(value)}\n`)
    }
  }
  join('}\n')
  return context
}

function resolveArrayObject(join: Function, push: Function, key: string, value: any | any[]) {
  const obj = isArray(value)? value[0] : value
  const val = isArray(value)? `${capitalize(stripS(key))}[]` : `${capitalize(stripS(key))}`
  join(`  ${key}: ${val}\n`)
  const currentContext = createInterface(key)
  const { interfaceStr, push: itemPush } = JsonType(obj, currentContext)
  push(itemPush(interfaceStr))
}
