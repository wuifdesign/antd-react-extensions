import React from 'react'
import { render, screen } from '@testing-library/react'
import { EnhancedButton } from './enhanced-button'

describe('Button', () => {
  it('should render', () => {
    render(<EnhancedButton>ButtonText</EnhancedButton>)
  })

  it('should display children', () => {
    render(<EnhancedButton>ButtonText</EnhancedButton>)
    const buttonText = screen.getByText(/ButtonText/i)
    expect(buttonText).toBeInTheDocument()
  })

  it('should have success class', () => {
    const { container } = render(<EnhancedButton success>ButtonText</EnhancedButton>)
    expect((container.firstChild as HTMLButtonElement).classList.contains('ant-btn-success')).toBe(true)
  })

  it('should have warning class', () => {
    const { container } = render(<EnhancedButton warning>ButtonText</EnhancedButton>)
    expect((container.firstChild as HTMLButtonElement).classList.contains('ant-btn-warning')).toBe(true)
  })

  it('should have text-inline class', () => {
    const { container } = render(<EnhancedButton type="text-inline">ButtonText</EnhancedButton>)
    expect((container.firstChild as HTMLButtonElement).classList.contains('ant-btn-text')).toBe(true)
    expect((container.firstChild as HTMLButtonElement).classList.contains('btn-text-inline')).toBe(true)
  })

  it('should have link-inline class', () => {
    const { container } = render(<EnhancedButton type="link-inline">ButtonText</EnhancedButton>)
    expect((container.firstChild as HTMLButtonElement).classList.contains('ant-btn-link')).toBe(true)
    expect((container.firstChild as HTMLButtonElement).classList.contains('btn-link-inline')).toBe(true)
  })
})
