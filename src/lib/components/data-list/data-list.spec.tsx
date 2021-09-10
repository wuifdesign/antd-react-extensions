import React from 'react'
import { render, screen } from '@testing-library/react'
import { DataList } from './data-list'

describe('DataListGroup', () => {
  it('should render', () => {
    render(<DataList elements={null} />)
  })

  it('should display title', () => {
    render(<DataList title="Title" elements={null} />)
    const title = screen.getByText(/Title/i)
    expect(title).toBeInTheDocument()
  })

  it('should display title and content', () => {
    render(<DataList elements={[{ title: 'Title', content: 'Content' }]} />)
    expect(screen.getByText(/Title/i)).toBeInTheDocument()
    expect(screen.getByText(/Content/i)).toBeInTheDocument()
  })
})
