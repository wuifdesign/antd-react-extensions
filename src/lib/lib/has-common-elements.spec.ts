import hasCommonElements from './has-common-elements'

describe('hasCommonElements', () => {
  it('has common elements', () => {
    const check = hasCommonElements([1, 2, 3], [1])
    expect(check).toEqual(true)
  })

  it('has no common elements', () => {
    const check = hasCommonElements([1, 2, 3], [4])
    expect(check).toEqual(false)
  })
})
