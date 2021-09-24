import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('should render', () => {
    render(<Button>ButtonText</Button>)
  })

  it('should display children', () => {
    render(<Button>ButtonText</Button>)
    const buttonText = screen.getByText(/ButtonText/i)
    expect(buttonText).toBeInTheDocument()
  })

  it('should have success class', () => {
    const { container } = render(<Button success>ButtonText</Button>)
    expect((container.firstChild as HTMLButtonElement).classList.contains('ant-btn-success')).toBe(true)
  })

  it('should have warning class', () => {
    const { container } = render(<Button warning>ButtonText</Button>)
    expect((container.firstChild as HTMLButtonElement).classList.contains('ant-btn-warning')).toBe(true)
  })

  it('should have text-inline class', () => {
    const { container } = render(<Button type="text-inline">ButtonText</Button>)
    expect((container.firstChild as HTMLButtonElement).classList.contains('ant-btn-text')).toBe(true)
    expect((container.firstChild as HTMLButtonElement).classList.contains('btn-text-inline')).toBe(true)
  })

  it('should have link-inline class', () => {
    const { container } = render(<Button type="link-inline">ButtonText</Button>)
    expect((container.firstChild as HTMLButtonElement).classList.contains('ant-btn-link')).toBe(true)
    expect((container.firstChild as HTMLButtonElement).classList.contains('btn-link-inline')).toBe(true)
  })
})
