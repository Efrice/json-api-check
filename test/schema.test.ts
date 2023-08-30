import { describe, it, expect } from 'vitest'
import { createInterface, getContent } from '../src/schema'
import { resolveOptionsConfig } from '../src/config'
import { OptionsConfig } from '../src/types'

describe("json schema type", () => {

  const defaultConfig: OptionsConfig = {
    schemaDir: 'schema',
    hasSubdirectory: false,
    subdirectory: '',
    method: 'GET',
    type: '',
    fileName: ''
  }

  it("should get content when data is base type array", () => {
    const data = [1, 2, 3]
    const options = Object.assign({}, defaultConfig)
    resolveOptionsConfig('/data', options)
    const context = createInterface(options.type)
    const content = getContent(data, context, options)
    expect(content).toMatchInlineSnapshot('"export type Data = number[]"')
  })

  it("should get content when data is object array", () => {
    const data = [{
      id: 1,
      name: 'test',
      value: 'test'
    }]
    const options = Object.assign({}, defaultConfig)
    resolveOptionsConfig('/data', options)
    const context = createInterface(options.type)
    const content = getContent(data, context, options)
    expect(content).toMatchInlineSnapshot(`
      "export type Datas = Data[]
      export interface Data {
        id: number
        name: string
        value: string
      }
      "
    `)
  })

  it("should get content when data is object", () => {
    const data = {
      id: 1,
      name: 'test',
      value: 'test'
    }
    const options = Object.assign({}, defaultConfig)
    resolveOptionsConfig('/data', options)
    const context = createInterface(options.type)
    const content = getContent(data, context, options)
    expect(content).toMatchInlineSnapshot(`
      "export interface Data {
        id: number
        name: string
        value: string
      }
      "
    `)
  })
})