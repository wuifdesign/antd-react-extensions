import React, { useState } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import EditableDate from './editable-date'

export const EditableDateParent: React.FC<{ value: string; handleSubmit: (value: any) => void }> = ({
  value,
  handleSubmit
}) => {
  const [_value, setValue] = useState<string | undefined>(value)
  return (
    <EditableDate
      value={_value}
      onSubmit={(newValue) => {
        setValue(newValue)
        handleSubmit(newValue)
        return Promise.resolve()
      }}
    />
  )
}

describe('EditableDate', () => {
  it('should render', () => {
    render(<EditableDate />)
  })

  it('should display value', () => {
    render(<EditableDate value="2020-10-10" />)
    expect(screen.getByText(/2020-10-10/i)).toBeInTheDocument()
  })

  it('should display placeholder', () => {
    render(<EditableDate placeholder="My Placeholder" />)
    act(() => {
      fireEvent.click(screen.getByTitle(/Edit Data/i))
    })
    expect(screen.getByPlaceholderText(/My Placeholder/i)).toBeInTheDocument()
  })

  it('should trigger submit', async () => {
    const handleSubmit = jest.fn().mockImplementation((value) => {
      expect(value).toBe('2020-10-09')
      return Promise.resolve()
    })
    render(<EditableDateParent value="2020-10-10" handleSubmit={handleSubmit} />)
    expect(screen.getByText(/2020-10-10/i)).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByTitle(/Edit Data/i))
    })
    const dateElement = screen.getByTitle(/2020-10-09/i)
    expect(dateElement).toBeInTheDocument()
    act(() => {
      fireEvent.click(dateElement)
    })
    await waitFor(() => {
      const element = document.querySelector('.editable-display')
      const check = element?.innerHTML.includes('2020-10-09')
      expect(check).toBe(true)
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
