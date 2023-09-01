import fs from 'fs'
import path from 'node:path'
import { isArray, isObject, getBaseType, capitalize, stripS } from './utils'
import { Context, OptionsConfig } from './types'

export function createSchemaFile(jsonObject, options: OptionsConfig){
  const { schemaDir, hasSubdirs, subdirectory, typeName, fileName } = options

  const schemaPath = path.resolve(`./${schemaDir}`)
  if(!fs.existsSync(schemaPath)){
    fs.mkdirSync(schemaPath)
  }

  const subdirPath = path.resolve(`./${schemaDir}/${subdirectory}`)
  if(hasSubdirs && !fs.existsSync(subdirPath)){
    fs.mkdirSync(subdirPath)
  }

  const filePath = path.resolve(subdirectory ? subdirPath : schemaPath, `./${fileName}.ts`)
  const schema = createSchema(typeName, jsonObject)
  writeFile(filePath, schema)
}

/**
 * Create a string containing the TypeScript source code for the JSON objcet. 
 * @param {string} typeName The name of the JSON target type in the schema.
 * @param {object} jsonObject The JSON object target.
 * @return {string} A string containing the TypeScript source code for the JSON objcet.
 */
export function createSchema(typeName: string, jsonObject: object): string {
  const context = createInterface(typeName)
  if(isArray(jsonObject)){
    if(isObject(jsonObject[0])){
      const { interfaceStr, interfaceItems } = JsonType(jsonObject[0], context)
      return `export type ${typeName} = ${stripS(typeName)}[]\n` + interfaceStr + interfaceItems.join("\n")
    }else {
      return `export type ${stripS(typeName)} = ${getBaseType(jsonObject[0])}[]`
    }
  }else {
    const { interfaceStr, interfaceItems } = JsonType(jsonObject, context)
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
