import React from 'react'
import { getKeysFromChildComponents } from './get-keys-from-child-components'

describe('getKeysFromChildComponents', () => {
  test('should get keys', async () => {
    const keys = getKeysFromChildComponents([
      <a key="test_1" />,
      <a key="test_2" />,
      <a href="#" />,
      <a key="test_3" />
    ])
    expect(keys).toEqual(['test_1', 'test_2', 'test_3'])
  })

  test('should handle single child', async () => {
    const keys = getKeysFromChildComponents(<a key="test_1" />)
    expect(keys).toEqual(['test_1'])
  })

  test('should return empty array for no children', async () => {
    const keys = getKeysFromChildComponents(null)
    expect(keys).toEqual([])
  })
})
