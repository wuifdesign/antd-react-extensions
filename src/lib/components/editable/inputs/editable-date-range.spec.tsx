import React, { useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { EditableDateRange } from './editable-date-range'

export const EditableDateRangeParent: React.FC<{ value: [string, string]; handleSubmit: (value: any) => void }> = ({
  value,
  handleSubmit
}) => {
  const [_value, setValue] = useState<[string, string] | undefined>(value)
  return (
    <EditableDateRange
      value={_value}
      onSubmit={(newValue) => {
        setValue(newValue)
        handleSubmit(newValue)
        return Promise.resolve()
      }}
    />
  )
}

describe('EditableDateRange', () => {
  it('should render', () => {
    render(<EditableDateRange />)
  })

  it('should display value', () => {
    render(<EditableDateRange value={['2020-10-10', '2020-10-15']} />)
    expect(screen.getByText(/2020-10-10 - 2020-10-15/i)).toBeInTheDocument()
  })

  it('should display placeholder', () => {
    render(<EditableDateRange placeholder={['First Placeholder', 'Second Placeholder']} />)
    fireEvent.click(screen.getByTitle(/Edit Data/i))
    expect(screen.getByPlaceholderText(/First Placeholder/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Second Placeholder/i)).toBeInTheDocument()
  })

  it('should trigger submit', async () => {
    const handleSubmit = jest.fn().mockImplementation((value) => {
      expect(value).toStrictEqual(['2020-10-09', '2020-10-15'])
      return Promise.resolve()
    })
    render(<EditableDateRangeParent value={['2020-10-10', '2020-10-15']} handleSubmit={handleSubmit} />)
    expect(screen.getByText(/2020-10-10 - 2020-10-15/i)).toBeInTheDocument()
    fireEvent.click(screen.getByTitle(/Edit Data/i))
    const dateRangeElement = screen.getByTitle(/2020-10-09/i)
    expect(dateRangeElement).toBeInTheDocument()
    fireEvent.click(dateRangeElement)
    await waitFor(() => {
      const element = document.querySelector('.editable-display')
      const check = element?.innerHTML.includes('2020-10-09 - 2020-10-15')
      expect(check).toBe(true)
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
