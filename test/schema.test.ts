import { describe, it, expect } from 'vitest'
import { createSchema } from '../src/schema'

describe("json schema type", () => {
  it("should get content when data is basic type array", () => {
    const data = [1, 2, 3]
    const content = createSchema('Data', data)
    expect(content).toMatchInlineSnapshot('"export type Data = number[]"')
  })

  it("should get content when data is simple object array", () => {
    const data = [{
      id: 1,
      name: 'test',
      value: 'test'
    }]
    const content = createSchema('Datas', data)
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

  it("should get content when data is simple object", () => {
    const data = {
      id: 1,
      name: 'test',
      value: 'test'
    }
    const content = createSchema("Data", data)
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