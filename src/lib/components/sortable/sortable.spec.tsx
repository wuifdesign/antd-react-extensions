import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Sortable, SortableProps } from './sortable'

const defaultProps: SortableProps<number> = {
  getItemKey: (item) => item.toString(),
  renderItem: (item) => `Item ${item}`,
  items: [1, 2, 3]
}

describe('Sortable', () => {
  it('should render', () => {
    render(<Sortable {...defaultProps} />)
  })

  it('should display items', () => {
    render(<Sortable {...defaultProps} />)
    for (const text of ['Item 1', 'Item 2', 'Item 3']) {
      const item = screen.getByText(text)
      expect(item).toBeInTheDocument()
    }
  })

  it('should show move handle', () => {
    const { baseElement } = render(<Sortable {...defaultProps} />)
    const btn = baseElement.querySelector('.sortable-handle')
    expect(btn).not.toBe(null)
  })

  it('should not show move handle', () => {
    const { baseElement } = render(<Sortable {...defaultProps} disabled={true} />)
    const btn = baseElement.querySelector('.sortable-handle')
    expect(btn).toBe(null)
  })

  it('should not show delete button', () => {
    const { baseElement } = render(<Sortable {...defaultProps} />)
    const btn = baseElement.querySelector('.sortable-delete')
    expect(btn).toBe(null)
  })

  it('should show delete button', () => {
    const { baseElement } = render(<Sortable {...defaultProps} onDelete={() => null} />)
    const btn = baseElement.querySelector('.sortable-delete')
    expect(btn).not.toBe(null)
  })

  it('should trigger delete', () => {
    const onDelete = jest.fn().mockImplementation((data) => {
      expect(data).toStrictEqual({ index: 0, newItems: [2, 3] })
    })
    render(<Sortable {...defaultProps} onDelete={onDelete} />)
    const btn = screen.getAllByTitle('Delete')
    const firstBtn = btn[0]
    expect(firstBtn).toBeInTheDocument()
    fireEvent.click(firstBtn)
    expect(onDelete).toHaveBeenCalledTimes(1)
  })
})
