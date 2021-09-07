import React from 'react'
import { render, screen } from '@testing-library/react'
import { DataDisplayItem } from './data-display-item'

describe('DataDisplayItem', () => {
  it('should render', () => {
    render(<DataDisplayItem label="Label" />)
  })

  it('should display label', () => {
    render(<DataDisplayItem label="Label" />)
    const label = screen.getByText(/Label/i)
    expect(label).toBeInTheDocument()
  })

  it('should display children', () => {
    render(<DataDisplayItem label="Label">Content</DataDisplayItem>)
    const content = screen.getByText(/Content/i)
    expect(content).toBeInTheDocument()
  })
})
