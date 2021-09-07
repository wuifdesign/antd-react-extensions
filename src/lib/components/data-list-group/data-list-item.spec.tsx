import React from 'react'
import { render, screen } from '@testing-library/react'
import { DataListItem } from './data-list-item'

describe('DataListItem', () => {
  it('should render', () => {
    render(<DataListItem label="Label" />)
  })

  it('should display label', () => {
    render(<DataListItem label="Label" />)
    const label = screen.getByText(/Label/i)
    expect(label).toBeInTheDocument()
  })

  it('should display children', () => {
    render(<DataListItem label="Label">Content</DataListItem>)
    const content = screen.getByText(/Content/i)
    expect(content).toBeInTheDocument()
  })
})
