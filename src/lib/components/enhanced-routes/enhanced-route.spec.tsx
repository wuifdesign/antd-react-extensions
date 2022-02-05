import React from 'react'
import { render, screen } from '@testing-library/react'
import { EnhancedRoute } from './enhanced-route'

describe('EnhancedRoute', () => {
  it('should render content', () => {
    render(<EnhancedRoute route={{ path: '/' }} element={<>Content</>} />)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
