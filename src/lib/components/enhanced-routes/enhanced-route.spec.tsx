import React from 'react'
import { render, screen } from '@testing-library/react'
import { EnhancedRoute } from './enhanced-route'

const Guard: React.FC<{ allowed: boolean }> = ({ allowed, children }) => {
  if (!allowed) {
    return <>BLOCKED</>
  }
  return <>{children}</>
}

describe('EnhancedRoute', () => {
  it('should render content', () => {
    render(<EnhancedRoute route={{ path: '/' }} element={<>Content</>} />)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should render content with guard', () => {
    render(<EnhancedRoute route={{ path: '/' }} guard={<Guard allowed={true} />} element={<>Content</>} />)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should render blocked content with guard', () => {
    render(<EnhancedRoute route={{ path: '/' }} guard={<Guard allowed={false} />} element={<>Content</>} />)
    expect(screen.getByText('BLOCKED')).toBeInTheDocument()
  })
})
