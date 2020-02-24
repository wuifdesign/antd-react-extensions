import truncate from './truncate'

const demoString = 'abcdefghijklmniopqrstufvwxyz'

describe('truncate', () => {
  it('should truncate to long string', () => {
    const check = truncate(demoString)
    expect(check).toEqual('abcdefghi…')
  })

  it('should truncate with custom length', () => {
    const check = truncate(demoString, 5)
    expect(check).toEqual('abcd…')
  })

  it('should truncate with custom append element', () => {
    const check = truncate(demoString, 10, '123')
    expect(check).toEqual('abcdefghi123')
  })

  it("shouldn't truncate short string ", () => {
    const check = truncate('test')
    expect(check).toEqual('test')
  })
})
