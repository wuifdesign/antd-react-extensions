import React from 'react'
import { render, screen } from '@testing-library/react'
import { Choose, OtherWise, When } from './choose'

const Test: React.FC<{ condition1: boolean; condition2: boolean }> = ({ condition1, condition2 }) => {
  return (
    <Choose>
      <When condition={condition1}>Condition 1</When>
      <When condition={condition2}>Condition 2</When>
      <OtherWise>Otherwise meet</OtherWise>
    </Choose>
  )
}

describe('Choose', () => {
  it('should render first condition', () => {
    render(<Test condition1={true} condition2={true} />)
    const content = screen.queryByText('Condition 1')
    expect(content).toBeInTheDocument()
  })
  it('should render second condition', () => {
    render(<Test condition1={false} condition2={true} />)
    const content = screen.queryByText('Condition 2')
    expect(content).toBeInTheDocument()
  })
  it('should not render otherwise', () => {
    render(<Test condition1={false} condition2={false} />)
    const content = screen.queryByText('Otherwise meet')
    expect(content).toBeInTheDocument()
  })
  it('should not render empty without otherwise', () => {
    const { container } = render(
      <Choose>
        <When condition={false}>Condition 1</When>
      </Choose>
    )
    expect(container.innerHTML).toBe('')
  })
  it('should not ignore other children', () => {
    render(
      <Choose>
        <div>DIV</div>
      </Choose>
    )
    const content = screen.queryByText('DIV')
    expect(content).not.toBeInTheDocument()
  })
})
