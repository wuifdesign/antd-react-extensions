import { deepDiff } from './deep-diff'

describe('deepDiff', () => {
  it('should return new value for simple values', () => {
    const check = deepDiff({ a: 1, b: 2 }, 'test')
    expect(check).toEqual('test')
  })

  it('should return diff values', () => {
    const check = deepDiff({ a: 1, b: 2 }, { a: 1, b: 3 })
    expect(check).toEqual({ b: 3 })
  })

  it('should return deep diff values ', () => {
    const check = deepDiff({ a: 1, b: { a: 1, b: 2 } }, { a: 1, b: { a: 1, b: 3 } }, null)
    expect(check).toEqual({ b: { b: 3 } })
  })

  it('should return same for 0', () => {
    const check = deepDiff({ a: 0 }, { a: 0 })
    expect(check).toEqual({})
  })

  it('should return same for null', () => {
    const check = deepDiff({ a: null }, { a: null })
    expect(check).toEqual({})
  })

  it('should return new added values', () => {
    const check = deepDiff({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })
    expect(check).toEqual({ c: 3 })
  })

  it('should compare arrays', () => {
    const check = deepDiff({ a: [1, 2] }, { a: [2] })
    expect(check).toEqual({ a: [2] })
  })

  it('should return deleted values', () => {
    const check = deepDiff({ a: 1, b: 2 }, { a: 1 })
    expect(check).toEqual({ b: null })
  })

  it('should return deleted values with custom deleteValue', () => {
    const check = deepDiff({ a: 1, b: 2 }, { a: 1 }, 'test')
    expect(check).toEqual({ b: 'test' })
  })
})
