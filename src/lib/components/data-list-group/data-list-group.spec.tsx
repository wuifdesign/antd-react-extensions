import React from 'react'
import { render, screen } from '@testing-library/react'
import { DataListGroup } from './data-list-group'

describe('DataListGroup', () => {
  it('should render', () => {
    render(<DataListGroup />)
  })

  it('should display title', () => {
    render(<DataListGroup title="Title" />)
    const title = screen.getByText(/Title/i)
    expect(title).toBeInTheDocument()
  })
})
