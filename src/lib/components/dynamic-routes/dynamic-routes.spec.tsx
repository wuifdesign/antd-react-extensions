import React from 'react'
import { render } from '@testing-library/react'
import { DynamicRoutes } from './dynamic-routes'
import { MemoryRouter } from 'react-router-dom'

describe('DynamicMenu', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <DynamicRoutes routes={[]} />
      </MemoryRouter>
    )
  })
})
