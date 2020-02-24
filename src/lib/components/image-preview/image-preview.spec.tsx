import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import ImagePreview from './image-preview'

describe('ImagePreview', () => {
  it('should render', () => {
    render(<ImagePreview url="/test.png" />)
  })

  it('should change titles', () => {
    render(
      <ImagePreview
        url="/test.png"
        deleteImageTitle="Delete Title"
        editImageTitle="Edit Title"
        showFullSizeTitle="Full Size Title"
        onDelete={() => Promise.resolve()}
        onEdit={() => Promise.resolve()}
      />
    )
    const deleteTitle = screen.getByTitle(/Delete Title/i)
    expect(deleteTitle).toBeInTheDocument()
    const editTitle = screen.getByTitle(/Edit Title/i)
    expect(editTitle).toBeInTheDocument()
    const fullSizeTitle = screen.getByTitle(/Full Size Title/i)
    expect(fullSizeTitle).toBeInTheDocument()
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
    act(() => {
      fireEvent.click(button)
    })
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
    act(() => {
      fireEvent.click(button)
    })
    await waitFor(() => {
      const modal = baseElement.querySelector('.ant-modal')
      expect(modal).toBeInTheDocument()
    })
    expect(onDelete).toHaveBeenCalledTimes(0)
    const deleteButton = baseElement.querySelector('.ant-modal .ant-btn-dangerous')
    expect(deleteButton).toBeInTheDocument()
    act(() => {
      fireEvent.click(deleteButton as HTMLElement)
    })
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('should not ask for confirmation on delete', async () => {
    const onDelete = jest.fn().mockImplementation(() => Promise.resolve())
    render(<ImagePreview url="/test.png" askForDeleteConfirmation={false} onDelete={onDelete} />)
    const button = screen.getByTitle(/Delete Image/i)
    expect(button).toBeInTheDocument()
    act(() => {
      fireEvent.click(button)
    })
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('should trigger onEdit', async () => {
    const onEdit = jest.fn().mockImplementation(() => Promise.resolve())
    render(<ImagePreview url="/test.png" fullscreenButton={false} onEdit={onEdit} />)
    const button = screen.getByTitle(/Edit Image/i)
    expect(button).toBeInTheDocument()
    act(() => {
      fireEvent.click(button)
    })
    expect(onEdit).toHaveBeenCalledTimes(1)
  })

  it('should display no image text', () => {
    render(<ImagePreview url={undefined} emptyText="My empty Text" />)
    const emptyText = screen.getByText(/My empty Text/i)
    expect(emptyText).toBeInTheDocument()
  })
})
