import React, { useState } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import EditableInput from './editable-input'

export const EditableInputParent: React.FC<{ value: string; handleSubmit: (value: any) => void }> = ({
  value,
  handleSubmit
}) => {
  const [_value, setValue] = useState<string | undefined>(value)
  return (
    <EditableInput
      value={_value}
      onSubmit={(newValue) => {
        setValue(newValue)
        handleSubmit(newValue)
        return Promise.resolve()
      }}
    />
  )
}

describe('EditableInput', () => {
  it('should render', () => {
    render(<EditableInput />)
  })

  it('should display value', () => {
    render(<EditableInput value="My Input" />)
    expect(screen.getByText(/My Input/i)).toBeInTheDocument()
  })

  it('should display placeholder', () => {
    render(<EditableInput placeholder="My Placeholder" />)
    act(() => {
      fireEvent.click(screen.getByTitle(/Edit Data/i))
    })
    expect(screen.getByPlaceholderText(/My Placeholder/i)).toBeInTheDocument()
  })

  it('should trigger submit', async () => {
    const handleSubmit = jest.fn().mockImplementation((value) => {
      expect(value).toBe('My new Input')
      return Promise.resolve()
    })
    render(<EditableInputParent value="My Input" handleSubmit={handleSubmit} />)
    expect(screen.getByText(/My Input/i)).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByTitle(/Edit Data/i))
    })
    const input = screen.getByDisplayValue(/My Input/i)
    expect(input).toBeInTheDocument()
    act(() => {
      fireEvent.change(input, { target: { value: 'My new Input' } })
    })
    act(() => {
      fireEvent.click(screen.getByTitle('Save'))
    })
    await waitFor(() => {
      const element = document.querySelector('.editable-display')
      const check = element?.innerHTML.includes('My new Input')
      expect(check).toBe(true)
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
