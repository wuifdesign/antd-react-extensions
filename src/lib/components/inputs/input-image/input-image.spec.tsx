import React from 'react'
import { render, screen } from '@testing-library/react'
import InputImage from './input-image'

describe('InputImage', () => {
  it('should render', () => {
    render(<InputImage />)
  })

  it('should display no image text', () => {
    render(<InputImage imagePreviewProps={{ emptyText: 'My empty Text' }} />)
    const emptyText = screen.getByText(/My empty Text/i)
    expect(emptyText).toBeInTheDocument()
  })

  it('should display default image', () => {
    render(<InputImage defaultImage="/test.png" />)
    const thumbImage = screen.getByAltText(/test.png/i)
    expect(thumbImage).toBeInTheDocument()
  })
})
