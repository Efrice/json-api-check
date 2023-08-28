import { resolveOptionsConfig } from '../src/utils'
import { OptionsConfig } from '../src/types'

describe("resolveOptionsConfig", ()=>{

  const defaultConfig: OptionsConfig = {
    schemaDir: 'schema',
    hasSubdirectory: false,
    subdirectory: '',
    method: 'GET',
    type: '',
    fileName: ''
  }

  it("should console error when path is not valid", ()=>{
    console.error = vi.fn()
    const options = Object.assign({}, defaultConfig)
    resolveOptionsConfig('//', options)
    expect(console.error).toBeCalled()
  })

  it("should fileName has value when path is valid", ()=>{
    const options = Object.assign({}, defaultConfig)
    resolveOptionsConfig('/users', options)
    expect(options.fileName).toBe('Users-GET')
  })

  it("should fileName has value and subdirectory has value when path is valid and hasSubdirectory is true", ()=>{
    const options = Object.assign({}, defaultConfig, { hasSubdirectory: true })
    resolveOptionsConfig('/users', options)
    expect(options.subdirectory).toBe('users')
    expect(options.fileName).toBe('Users-GET')

    resolveOptionsConfig('/vip/users', options)
    expect(options.subdirectory).toBe('vip')
    expect(options.fileName).toBe('Users-GET')

    resolveOptionsConfig('//vip/xxx/users', options)
    expect(options.subdirectory).toBe('vip')
    expect(options.fileName).toBe('Users-GET')

    resolveOptionsConfig('//vip/xxx/users/12', options)
    expect(options.subdirectory).toBe('vip')
    expect(options.fileName).toBe('Users-GET')
  })
})