import * as ts from 'typescript'
import fs from 'fs'
import path from 'path'
import { printErrorLog } from './log'
import { Error } from './types'
import { capitalize } from './utils'

const rootProgram = createProgramFromModuleText()

export function validator(typeSchema: string, jsonObject: object, options) {
  const { schemaDir: schema } = options
  const moduleText = createModuleTextFromJson(typeSchema, jsonObject)
  const program = createProgramFromModuleText(typeSchema, moduleText, schema, rootProgram)
  const syntacticDiagnostics = program.getSyntacticDiagnostics()
  const programDiagnostics = syntacticDiagnostics.length ? syntacticDiagnostics : program.getSemanticDiagnostics()
  if (programDiagnostics.length) {
    const errors = programDiagnostics.map(d => getDiagnostic(d))
    printErrorLog(typeSchema, errors, options)
  }
}

function getDiagnostic(d: ts.Diagnostic): Error{
  return {
    property: getTypeProperty(d.file && d.file.text || '', (d.start || 0) + 1),
    message: typeof d.messageText === "string" ? d.messageText : d.messageText.messageText
  }
}

function getTypeProperty(text: string, start: number): string {
  let letter = text[start], typeProperty = ''
  while(letter !== "\""){
    typeProperty += letter
    letter = text[++start]
  }
  return capitalize(typeProperty)
}

function createModuleTextFromJson(typeSchema: string, jsonObject: object): string {
  return `import { ${typeSchema} } from './schema';\nconst json: ${typeSchema} = ${JSON.stringify(jsonObject, null, 2)};\n`
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
