import React from 'react'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './error-boundary'

const ComponentWithError = () => {
  throw new Error('Error')
}

describe('ErrorBoundary', () => {
  it('should render content', () => {
    render(<ErrorBoundary>My Content</ErrorBoundary>)
    const title = screen.queryByText(/My Content/i)
    expect(title).toBeInTheDocument()
  })

  it('should display error page', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    )
    const title = screen.queryByText(/500/i)
    expect(title).toBeInTheDocument()
    const info = screen.queryByText(/Sorry, something went wrong please try again./i)
    expect(info).toBeInTheDocument()
    spy.mockRestore()
  })

  it('should display fallback', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    render(
      <ErrorBoundary fallback={<div>My Custom Fallback</div>}>
        <ComponentWithError />
      </ErrorBoundary>
    )
    const info = screen.queryByText(/My Custom Fallback/i)
    expect(info).toBeInTheDocument()
    spy.mockRestore()
  })

  it('should catch error but not display error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()
    render(
      <ErrorBoundary showFallback={false}>
        <ComponentWithError />
      </ErrorBoundary>
    )
    const title = screen.queryByText(/500/i)
    expect(title).not.toBeInTheDocument()
    const info = screen.queryByText(/Sorry, something went wrong please try again./i)
    expect(info).not.toBeInTheDocument()
    spy.mockRestore()
  })
})
