import React from 'react'
import { render } from '@testing-library/react'
import { DynamicMenu } from './dynamic-menu'

describe('DynamicMenu', () => {
  it('should render', () => {
    render(<DynamicMenu elements={[]} />)
  })
})
