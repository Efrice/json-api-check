import { describe, it, expect } from 'vitest'
import { createSchema } from '../src/schema'

describe("Typescript schema", () => {
  it("should return right schema when data is basic type array", () => {
    const data = [1, 2, 3]
    const schema = createSchema('Data', data)
    expect(schema).toMatchInlineSnapshot('"export type Data = number[]"')
  })

  it("should return right schema when data is simple object array", () => {
    const data = [{
      id: 1,
      name: 'test',
      value: 'test'
    }]
    const schema = createSchema('Datas', data)
    expect(schema).toMatchInlineSnapshot(`
      "export type Datas = Data[]
      export interface Data {
        id: number
        name: string
        value: string
      }
      "
    `)
  })

  it("should return right schema when data is simple object", () => {
    const data = {
      id: 1,
      name: 'test',
      value: 'test'
    }
    const schema = createSchema("Data", data)
    expect(schema).toMatchInlineSnapshot(`
      "export interface Data {
        id: number
        name: string
        value: string
      }
      "
    `)
  })

  it("should return right schema when data is nested object", () => {
    const data = {
      id: 1,
      name: 'test',
      value: [{
        age: 17
      }]
    }
    const schema = createSchema("Data", data)
    expect(schema).toMatchInlineSnapshot(`
      "export interface Data {
        id: number
        name: string
        value: Value[]
      }
      export interface Value {
        age: number
      }
      "
    `)
  })
})