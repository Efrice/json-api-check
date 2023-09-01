export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface Option {
  schemaDir?: string
  hasSubdirs?: boolean
}

export interface OptionsConfig extends Option {
  subdirectory: string
  method: string
  typeName: string
  fileName: string
  isObjectArray: boolean
}

export interface Context {
  interfaceStr: string,
  interfaceItems: string[],
  join(str: string): void,
  push(item: string | string[]): void
}

export interface Error {
  lines: string[]
  property: string
  message: string
}

export interface Result {
  filePath: string
  errors: Error[]
}
