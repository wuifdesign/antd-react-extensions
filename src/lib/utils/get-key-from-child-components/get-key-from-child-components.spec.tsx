import React from 'react'
import { getKeyFromChildComponents } from './get-key-from-child-components'

describe('getKeysFromChildComponents', () => {
  test('should get keys', async () => {
    const keys = getKeyFromChildComponents([<div key="test_1" />, <div key="test_2" />, <div />, <div key="test_3" />])
    expect(keys).toEqual(['test_1', 'test_2', 'test_3'])
  })

  test('should handle single child', async () => {
    const keys = getKeyFromChildComponents(<div key="test_1" />)
    expect(keys).toEqual(['test_1'])
  })

  test('should return empty array for no children', async () => {
    const keys = getKeyFromChildComponents(null)
    expect(keys).toEqual([])
  })
})
