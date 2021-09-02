import React from 'react'
import { render, screen } from '@testing-library/react'
import { CollapseContainer } from './collapse-container'

describe('CollapseContainer', () => {
  it('should render content', () => {
    render(<CollapseContainer isOpened={true}>My Content</CollapseContainer>)
    const title = screen.queryByText(/My Content/i)
    expect(title).toBeInTheDocument()
  })

  it('should init opened', () => {
    const { baseElement } = render(<CollapseContainer isOpened={true}>My Content</CollapseContainer>)
    const container = baseElement.querySelector('.collapse-container') as HTMLDivElement
    expect(container.style.overflow).toBe('')
    expect(container.style.height).toBe('auto')
  })

  it('should init closed', () => {
    const { baseElement } = render(<CollapseContainer isOpened={false}>My Content</CollapseContainer>)
    const container = baseElement.querySelector('.collapse-container') as HTMLDivElement
    expect(container.style.overflow).toBe('hidden')
    expect(container.style.height).toBe('0px')
  })
})
