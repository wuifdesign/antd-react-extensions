import React from 'react'
import { render, screen } from '@testing-library/react'
import DataDisplayRow from './data-display-row'

describe('DataDisplayRow', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    })
  })

  it('should render', () => {
    render(<DataDisplayRow label="Label" />)
  })

  it('should display label', () => {
    render(<DataDisplayRow label="Label" />)
    const label = screen.getByText(/Label/i)
    expect(label).toBeInTheDocument()
  })
})
