import React, { useState } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { EditableTextarea } from './editable-textarea'

export const EditableTextareaParent: React.FC<{ value: string; handleSubmit: (value: any) => void }> = ({
  value,
  handleSubmit
}) => {
  const [_value, setValue] = useState<string | undefined>(value)
  return (
    <EditableTextarea
      value={_value}
      onSubmit={(newValue) => {
        setValue(newValue)
        handleSubmit(newValue)
        return Promise.resolve()
      }}
    />
  )
}

describe('EditableTextarea', () => {
  it('shows render', () => {
    render(<EditableTextarea />)
  })

  it('should display value', () => {
    render(<EditableTextarea value="My Textarea" />)
    expect(screen.getByText(/My Textarea/i)).toBeInTheDocument()
  })

  it('should display placeholder', () => {
    render(<EditableTextarea placeholder="My Placeholder" />)
    act(() => {
      fireEvent.click(screen.getByTitle(/Edit Data/i))
    })
    expect(screen.getByPlaceholderText(/My Placeholder/i)).toBeInTheDocument()
  })

  it('should trigger submit', async () => {
    const handleSubmit = jest.fn().mockImplementation((value) => {
      expect(value).toBe('My new Textarea')
      return Promise.resolve()
    })
    render(<EditableTextareaParent value="My Textarea" handleSubmit={handleSubmit} />)
    expect(screen.getByText(/My Textarea/i)).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByTitle(/Edit Data/i))
    })
    const input = screen.getByDisplayValue(/My Textarea/i)
    expect(input).toBeInTheDocument()
    act(() => {
      fireEvent.change(input, { target: { value: 'My new Textarea' } })
    })
    act(() => {
      fireEvent.click(screen.getByTitle('Save'))
    })
    await waitFor(() => {
      const element = document.querySelector('.editable-display')
      const check = element?.innerHTML.includes('My new Textarea')
      expect(check).toBe(true)
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
