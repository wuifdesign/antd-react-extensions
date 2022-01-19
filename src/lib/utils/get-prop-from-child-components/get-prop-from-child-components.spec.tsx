import React from 'react'
import { getPropFromChildComponents } from './get-prop-from-child-components'

describe('getKeysFromChildComponents', () => {
  test('should get keys', async () => {
    const keys = getPropFromChildComponents(
      [<a key="test_1" />, <a key="test_2" />, <a href="#" />, <a key="test_3" />],
      'key'
    )
    expect(keys).toEqual(['test_1', 'test_2', 'test_3'])
  })

  test('should handle single child', async () => {
    const keys = getPropFromChildComponents(<a key="test_1" />, 'key')
    expect(keys).toEqual(['test_1'])
  })

  test('should return empty array for no children', async () => {
    const keys = getPropFromChildComponents(null, 'key')
    expect(keys).toEqual([])
  })
})
