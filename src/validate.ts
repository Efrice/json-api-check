import * as ts from 'typescript'
import fs from 'fs'
import path from 'path'
import { printErrorLog } from './log'
import { Error, OptionsConfig, Result } from './types'
import { lower } from './utils'

const rootProgram = createProgramFromModuleText()

export function validate(jsonObject: object, options: OptionsConfig): Result {
  const { schemaDir: schema, hasSubdirectory, subdirectory, type, fileName } = options
  const moduleText = createModuleTextFromJson(type, jsonObject)
  const schemaDir = hasSubdirectory && subdirectory ? schema + '/' + subdirectory : schema
  const program = createProgramFromModuleText(fileName, moduleText, schemaDir, rootProgram)
  const syntacticDiagnostics = program.getSyntacticDiagnostics()
  const programDiagnostics = syntacticDiagnostics.length ? syntacticDiagnostics : program.getSemanticDiagnostics()
  if (programDiagnostics.length) {
    const filePath = ` ${schema} > ` + `${hasSubdirectory && subdirectory ? subdirectory + ' > ' : ''}` + `${fileName}.ts `
    const errors = programDiagnostics.map(d => getDiagnostic(d))
    printErrorLog(filePath, errors)
    return {
      filePath,
      errors
    }
  }
  return {
    filePath: '',
    errors: []
  }
}

function getDiagnostic(d: ts.Diagnostic): Error {
  return {
    line: getLine(d.file && d.file.text || '', (d.start || 0) + 1),
    property: getTypeProperty(d.file && d.file.text || '', (d.start || 0) + 1),
    message: typeof d.messageText === "string" ? lower(d.messageText) : lower(d.messageText.messageText)
  }
}

function getLine(text: string, start: number): number {
  let line = 1
  const texts = text.split('\n')
  for (let i = 0; i < texts.length; i++) {
    const item = texts[i]
    if(item.length > start){
      line = i
      break
    }else {
      start -= item.length
    }
  }
  return line
}

function getTypeProperty(text: string, start: number): string {
  let letter = text[start], typeProperty = ''
  while(letter !== "\""){
    typeProperty += letter
    letter = text[++start]
  }
  return typeProperty
}

function createModuleTextFromJson(type: string, jsonObject: object): string {
  return `import { ${type} } from './schema';\nconst json: ${type} = ${JSON.stringify(jsonObject, null, 2)};\n`
}

function createProgramFromModuleText(typeSchema = '', moduleText = '', schemaDir = 'schema', oldProgram?: ts.Program): ts.Program {
  const libText = `interface Array<T> { length: number, [n: number]: T }
    interface Object { toString(): string }
    interface Function { prototype: unknown }
    interface CallableFunction extends Function {}
    interface NewableFunction extends Function {}
    interface String { readonly length: number }
    interface Boolean { valueOf(): boolean }
    interface Number { valueOf(): number }
    interface RegExp { test(string: string): boolean }`

  const schema = typeSchema ? fs.readFileSync(path.resolve(`./${schemaDir}/${typeSchema}.ts`), "utf8") : ''
  
  const fileMap = new Map([
    createFileMapEntry("/lib.d.ts", libText),
    createFileMapEntry("/schema.ts", schema),
    createFileMapEntry("/json.ts", moduleText)
  ])

  const options = {
    ...ts.getDefaultCompilerOptions(),
    strict: true,
    skipLibCheck: true,
    noLib: true,
    types: []
  }

  const host: ts.CompilerHost = {
    getSourceFile: fileName => fileMap.get(fileName),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: fileName => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: fileName => fileMap.has(fileName),
    readFile: fileName => "",
  }
  return ts.createProgram(Array.from(fileMap.keys()), options, host, oldProgram);
}

function createFileMapEntry(filePath: string, fileText: string): [string, ts.SourceFile] {
  return [filePath, ts.createSourceFile(path.resolve('./', filePath), fileText, ts.ScriptTarget.Latest)];
}
