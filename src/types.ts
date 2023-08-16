export interface Config {
  schemaDir: string
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
