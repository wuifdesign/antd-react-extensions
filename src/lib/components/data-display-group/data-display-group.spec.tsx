import React from 'react'
import { render, screen } from '@testing-library/react'
import DataDisplayGroup from './data-display-group'

describe('DataDisplayRowGroup', () => {
  it('should render', () => {
    render(<DataDisplayGroup />)
  })

  it('should display title', () => {
    render(<DataDisplayGroup title="Title" />)
    const title = screen.getByText(/Title/i)
    expect(title).toBeInTheDocument()
  })
})
