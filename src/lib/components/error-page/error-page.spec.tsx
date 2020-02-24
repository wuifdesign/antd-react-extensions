import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorPage from './error-page'

describe('ErrorPage', () => {
  it('should render 404', () => {
    render(<ErrorPage type={404} />)
    const title = screen.queryByText(/404/i)
    expect(title).toBeInTheDocument()
  })

  it('should render 403', () => {
    render(<ErrorPage type={403} />)
    const title = screen.queryByText(/403/i)
    expect(title).toBeInTheDocument()
  })

  it('should render 500', () => {
    render(<ErrorPage type={500} />)
    const title = screen.queryByText(/500/i)
    expect(title).toBeInTheDocument()
  })
})
