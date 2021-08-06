import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import FormOverlay, { FormOverlayProps } from './form-overlay'
import { Form, Input } from 'antd'

const defaultProps: FormOverlayProps = {
  visible: true,
  onClose: () => null,
  onSubmit: () => Promise.resolve()
}

describe('FormOverlay', () => {
  it('should render', () => {
    render(<FormOverlay {...defaultProps} />)
  })

  it('should display title', () => {
    render(<FormOverlay {...defaultProps} title="My Title" />)
    const title = screen.queryByText(/My Title/i)
    expect(title).toBeInTheDocument()
  })

  it('should display content', () => {
    render(<FormOverlay {...defaultProps}>My Content</FormOverlay>)
    const title = screen.queryByText(/My Content/i)
    expect(title).toBeInTheDocument()
  })

  it('should display modal', () => {
    const { baseElement } = render(<FormOverlay {...defaultProps} />)
    const modal = baseElement.querySelector('.ant-modal')
    expect(modal).toBeInTheDocument()
  })

  it('should display drawer', () => {
    const { baseElement } = render(<FormOverlay {...defaultProps} type="drawer" />)
    const drawer = baseElement.querySelector('.ant-drawer')
    expect(drawer).toBeInTheDocument()
  })

  it('should change buttons', () => {
    const { baseElement } = render(
      <FormOverlay
        {...defaultProps}
        submitButtonProps={{ type: 'text' }}
        submitButtonText="Custom Submit Text"
        cancelButtonProps={{ type: 'ghost' }}
        cancelButtonText="Custom Cancel Text"
      />
    )
    const submitButton = baseElement.querySelector('.ant-btn-text')
    expect(submitButton).toBeInTheDocument()
    const cancelButton = baseElement.querySelector('.ant-btn-ghost')
    expect(cancelButton).toBeInTheDocument()
    const submitText = screen.queryByText(/Custom Submit Text/i)
    expect(submitText).toBeInTheDocument()
    const cancelText = screen.queryByText(/Custom Cancel Text/i)
    expect(cancelText).toBeInTheDocument()
  })

  it('should remove buttons', () => {
    const { baseElement } = render(
      <FormOverlay
        {...defaultProps}
        submitButtonText="Custom Submit Text"
        cancelButtonText="Custom Cancel Text"
        buttons={{
          left: [],
          right: []
        }}
      />
    )
    const submitButton = baseElement.querySelector('.ant-btn-text')
    expect(submitButton).not.toBeInTheDocument()
    const cancelButton = baseElement.querySelector('.ant-btn-ghost')
    expect(cancelButton).not.toBeInTheDocument()
    const submitText = screen.queryByText(/Custom Submit Text/i)
    expect(submitText).not.toBeInTheDocument()
    const cancelText = screen.queryByText(/Custom Cancel Text/i)
    expect(cancelText).not.toBeInTheDocument()
  })

  it('should trigger submit', async () => {
    const handleSubmit = jest.fn().mockImplementation((value) => {
      expect(value).toStrictEqual({ name: 'My Name' })
      return Promise.resolve()
    })
    render(
      <FormOverlay initialValues={{ name: 'My Name' }} {...defaultProps} onSubmit={handleSubmit}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
          <Input />
        </Form.Item>
      </FormOverlay>
    )
    const button = screen.getByText(/Save/i)
    expect(button).toBeInTheDocument()
    act(() => {
      fireEvent.click(button)
    })
    await waitFor(() => null)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
