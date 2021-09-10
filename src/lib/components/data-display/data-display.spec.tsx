import React from 'react'
import { render, screen } from '@testing-library/react'
import { DataDisplay } from './data-display'

describe('DataListGroup', () => {
  it('should render', () => {
    render(<DataDisplay elements={null} />)
  })

  it('should render with elements', () => {
    render(<DataDisplay elements={[{ title: 'Title', content: 'Content' }]} />)
    expect(screen.getByText(/Title/i)).toBeInTheDocument()
    expect(screen.getByText(/Content/i)).toBeInTheDocument()
  })
})
