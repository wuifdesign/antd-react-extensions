import React from 'react'
import { render, screen } from '@testing-library/react'
import { If } from './if'

describe('If', () => {
  it('should render content if condition meet', () => {
    render(<If condition={true}>My Content</If>)
    const content = screen.queryByText('My Content')
    expect(content).toBeInTheDocument()
  })
  it('should not render content if condition is not meet', () => {
    render(<If condition={false}>My Content</If>)
    const content = screen.queryByText('My Content')
    expect(content).not.toBeInTheDocument()
  })
})
