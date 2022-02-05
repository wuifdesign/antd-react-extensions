import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ImagePreview } from './image-preview'

describe('ImagePreview', () => {
  it('should render', () => {
    render(<ImagePreview url="/test.png" />)
  })

  it('should render thumb', () => {
    render(<ImagePreview url="/test.png" thumbUrl="/test2.png" />)
    const thumbImage = screen.getByAltText(/test2.png/i)
    expect(thumbImage).toBeInTheDocument()
  })

  it('should show modal', async () => {
    const { baseElement } = render(<ImagePreview url="/test.png" />)
    const button = screen.getByTitle(/Show Full Size/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => {
      const modal = baseElement.querySelector('.ant-modal')
      expect(modal).toBeInTheDocument()
    })
  })

  it('should ask for confirmation on delete', async () => {
    const onDelete = jest.fn().mockImplementation(() => Promise.resolve())
    const { baseElement } = render(<ImagePreview url="/test.png" onDelete={onDelete} />)
    const button = screen.getByTitle(/Delete Image/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => {
      const modal = baseElement.querySelector('.ant-modal')
      expect(modal).toBeInTheDocument()
    })
    expect(onDelete).toHaveBeenCalledTimes(0)
    const deleteButton = baseElement.querySelector('.ant-modal .ant-btn-dangerous')
    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton as HTMLElement)
    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledTimes(1)
    })
  })

  it('should not ask for confirmation on delete', async () => {
    const onDelete = jest.fn().mockImplementation(() => Promise.resolve())
    render(<ImagePreview url="/test.png" askForDeleteConfirmation={false} onDelete={onDelete} />)
    const button = screen.getByTitle(/Delete Image/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('should trigger onEdit', async () => {
    const onEdit = jest.fn().mockImplementation(() => Promise.resolve())
    render(<ImagePreview url="/test.png" fullscreenButton={false} onEdit={onEdit} />)
    const button = screen.getByTitle(/Edit Image/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(onEdit).toHaveBeenCalledTimes(1)
  })

  it('should display no image text', () => {
    render(<ImagePreview url={undefined} />)
    const emptyText = screen.getByText(/No Image/i)
    expect(emptyText).toBeInTheDocument()
  })
})
