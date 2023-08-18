export interface Option {
  schemaDir?: string
  hasSubdirectory?: boolean
}

export interface OptionsConfig extends Option {
  subdirectory: string
  type: string
  fileName: string
}

export interface Error {
  property: string
  message: string
}

export interface Context {
  interfaceStr: string,
  interfaceItems: string[],
  join(str: string): void,
  push(item: string | string[]): void
}
