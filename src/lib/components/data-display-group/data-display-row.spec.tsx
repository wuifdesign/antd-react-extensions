import React from 'react'
import { render, screen } from '@testing-library/react'
import DataDisplayRow from './data-display-row'

describe('DataDisplayRow', () => {
  it('should render', () => {
    render(<DataDisplayRow label="Label" />)
  })

  it('should display label', () => {
    render(<DataDisplayRow label="Label" />)
    const label = screen.getByText(/Label/i)
    expect(label).toBeInTheDocument()
  })
})
