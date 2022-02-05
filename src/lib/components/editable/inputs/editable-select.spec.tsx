import React, { useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SelectProps } from 'antd/es'
import { EditableSelect } from './editable-select'

type SelectValueType = string | number | string[] | number[]

const selectProps: SelectProps<any> = {
  options: [
    { label: 'Value 1', value: '1' },
    { label: 'Value 2', value: '2' },
    { label: 'Value 3', value: '3' }
  ]
}

const selectPropsMultiple: SelectProps<any> = {
  ...selectProps,
  mode: 'multiple'
}

export const EditableSelectParent: React.FC<{
  value: SelectValueType
  innerSelectProps?: SelectProps<any>
  handleSubmit: (value: any) => void
}> = ({ value, innerSelectProps = selectProps, handleSubmit }) => {
  const [_value, setValue] = useState<SelectValueType | undefined>(value)
  return (
    <EditableSelect
      selectProps={innerSelectProps}
      value={_value}
      onSubmit={(newValue) => {
        setValue(newValue)
        handleSubmit(newValue)
        return Promise.resolve()
      }}
    />
  )
}

describe('EditableSelect', () => {
  describe('Single', () => {
    it('should render', () => {
      render(<EditableSelect selectProps={selectProps} />)
    })

    it('should display value', () => {
      render(<EditableSelect selectProps={selectProps} value="1" />)
      expect(screen.getByText(/Value 1/i)).toBeInTheDocument()
    })

    it('should display placeholder', async () => {
      render(<EditableSelect selectProps={selectProps} placeholder="My Placeholder" />)
      fireEvent.click(screen.getByTitle(/Edit Data/i))
      await screen.findByText(/My Placeholder/i)
      expect(screen.getByText(/My Placeholder/i)).toBeInTheDocument()
    })

    it('should trigger submit', async () => {
      const handleSubmit = jest.fn().mockImplementation((value) => {
        expect(value).toBe('2')
        return Promise.resolve()
      })
      render(<EditableSelectParent value="1" handleSubmit={handleSubmit} />)
      expect(screen.getByText(/Value 1/i)).toBeInTheDocument()
      fireEvent.click(screen.getByTitle(/Edit Data/i))
      const optionElement = screen.getByTitle(/Value 2/i)
      expect(optionElement).toBeInTheDocument()
      fireEvent.click(optionElement)
      await waitFor(() => {
        const element = document.querySelector('.editable-display')
        const check = element?.innerHTML.includes('Value 2')
        expect(check).toBe(true)
      })
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })

  describe('Multi', () => {
    it('should render', () => {
      render(<EditableSelect selectProps={selectPropsMultiple} />)
    })

    it('should display value', () => {
      render(<EditableSelect selectProps={selectPropsMultiple} value={['1', '2']} />)
      expect(screen.getByText(/Value 1/i)).toBeInTheDocument()
      expect(screen.getByText(/Value 2/i)).toBeInTheDocument()
    })

    it('should display placeholder', async () => {
      render(<EditableSelect selectProps={selectPropsMultiple} placeholder="My Placeholder" />)
      fireEvent.click(screen.getByTitle(/Edit Data/i))
      await screen.findByText(/My Placeholder/i)
      expect(screen.getByText(/My Placeholder/i)).toBeInTheDocument()
    })

    it('should trigger submit', async () => {
      const handleSubmit = jest.fn().mockImplementation((value) => {
        expect(value).toStrictEqual(['1', '2', '3'])
        return Promise.resolve()
      })
      render(
        <EditableSelectParent innerSelectProps={selectPropsMultiple} value={['1', '2']} handleSubmit={handleSubmit} />
      )
      expect(screen.getByText(/Value 1, Value 2/i)).toBeInTheDocument()
      fireEvent.click(screen.getByTitle(/Edit Data/i))
      const optionElement = screen.getByTitle(/Value 3/i)
      expect(optionElement).toBeInTheDocument()
      fireEvent.click(optionElement)
      fireEvent.click(screen.getByTitle('Save'))
      await waitFor(() => {
        const element = document.querySelector('.editable-display')
        const check = element?.innerHTML.includes('Value 1, Value 2, Value 3')
        expect(check).toBe(true)
      })
      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
