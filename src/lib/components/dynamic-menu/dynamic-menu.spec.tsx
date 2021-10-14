import React from 'react'
import { render } from '@testing-library/react'
import { DynamicMenu } from './dynamic-menu'
import { MemoryRouter } from 'react-router-dom'

describe('DynamicMenu', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <DynamicMenu elements={[]} />
      </MemoryRouter>
    )
  })
})
