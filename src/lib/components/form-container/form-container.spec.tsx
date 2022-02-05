import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FormContainer, FormContainerProps } from './form-container'
import { Form, Input } from 'antd'

const defaultProps: FormContainerProps = {
  visible: true,
  onCancel: () => null,
  onSubmit: () => Promise.resolve()
}

describe('FormOverlay', () => {
  it('should render', () => {
    render(<FormContainer {...defaultProps} />)
  })

  it('should display title', () => {
    render(<FormContainer {...defaultProps} title="My Title" />)
    const title = screen.queryByText(/My Title/i)
    expect(title).toBeInTheDocument()
  })

  it('should display content', () => {
    render(<FormContainer {...defaultProps}>My Content</FormContainer>)
    const title = screen.queryByText(/My Content/i)
    expect(title).toBeInTheDocument()
  })

  it('should display inline', () => {
    const { baseElement } = render(<FormContainer type="inline" {...defaultProps} />)
    const modal = baseElement.querySelector('.form-container-inline')
    expect(modal).toBeInTheDocument()
  })

  it('should display modal', () => {
    const { baseElement } = render(<FormContainer type="modal" {...defaultProps} />)
    const modal = baseElement.querySelector('.ant-modal')
    expect(modal).toBeInTheDocument()
  })

  it('should display drawer', () => {
    const { baseElement } = render(<FormContainer {...defaultProps} type="drawer" />)
    const drawer = baseElement.querySelector('.ant-drawer')
    expect(drawer).toBeInTheDocument()
  })

  it('should change buttons', () => {
    const { baseElement } = render(
      <FormContainer
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
      <FormContainer
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
      <FormContainer initialValues={{ name: 'My Name' }} {...defaultProps} onSubmit={handleSubmit}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
          <Input />
        </Form.Item>
      </FormContainer>
    )
    const button = screen.getByText(/Save/i)
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    await waitFor(() => null)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
