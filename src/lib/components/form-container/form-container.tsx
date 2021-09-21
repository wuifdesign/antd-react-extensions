import React, { useEffect, useRef, useState } from 'react'
import { Drawer, Form, Modal, Space } from 'antd'
import { FormInstance } from 'antd/es/form'
import { IconUndo } from '../icons'
import { Button, ButtonProps } from '../button/button'
import { useTranslations } from '../config-provider/use-translations'
import clsx from 'clsx'

export type FormOverlayButtons = 'reset' | 'cancel' | 'submit' | React.ReactNode

export type FormContainerProps = {
  visible: boolean
  onCancel: () => void
  onSubmit: (value: any) => Promise<void>
  width?: number
  title?: string
  type?: 'drawer' | 'modal' | 'inline'
  submitButtonProps?: ButtonProps
  submitButtonText?: string
  submitButtonIcon?: React.ReactNode
  submitButtonDisabled?: boolean
  cancelButtonProps?: ButtonProps
  cancelButtonText?: string
  buttons?: {
    left: FormOverlayButtons[]
    right: FormOverlayButtons[]
  }
  initialValues?: object
}

export const FormContainer: React.FC<FormContainerProps> = ({
  visible,
  onCancel,
  onSubmit,
  width = 600,
  title,
  type = 'inline',
  submitButtonProps = { type: 'primary' },
  submitButtonText,
  submitButtonIcon,
  submitButtonDisabled = false,
  cancelButtonProps = {},
  cancelButtonText,
  buttons = {
    left: ['reset'],
    right: ['cancel', 'submit']
  },
  initialValues = {},
  children
}) => {
  const formRef = useRef<FormInstance>(null)
  const [loading, setLoading] = useState(false)
  const translations = useTranslations()

  useEffect(() => {
    if (visible && formRef.current) {
      formRef.current.resetFields()
    }
  }, [visible, formRef])

  const triggerSubmit = (value: any) => {
    setLoading(true)
    onSubmit(value)
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const renderButtons = (buttons: FormOverlayButtons[]) => {
    const parsedButtons: React.ReactNode[] = []
    for (const button of buttons) {
      switch (button) {
        case 'submit':
          parsedButtons.push(
            <Button
              disabled={submitButtonDisabled}
              htmlType="submit"
              loading={loading}
              icon={submitButtonIcon}
              {...submitButtonProps}
            >
              {submitButtonText || translations.FormOverlay.btnSave}
            </Button>
          )
          break
        case 'cancel':
          parsedButtons.push(
            <Button onClick={onCancel} {...cancelButtonProps}>
              {cancelButtonText || translations.FormOverlay.btnCancel}
            </Button>
          )
          break
        case 'reset':
          parsedButtons.push(
            <Button
              type="link"
              onClick={() => (formRef.current ? formRef.current.resetFields() : null)}
              icon={<IconUndo />}
            >
              {translations.FormOverlay.btnReset}
            </Button>
          )
          break
        default:
          parsedButtons.push(button)
      }
    }
    return parsedButtons.map((btn, index) => <div key={index}>{btn}</div>)
  }

  const content = (
    <Form
      ref={formRef}
      onFinish={triggerSubmit}
      layout="vertical"
      className={clsx('form-container', { 'form-container-inline': type === 'inline' })}
      initialValues={initialValues}
    >
      <div className="form-container-body">{children}</div>
      <div className="form-container-footer">
        <Space style={{ marginRight: 'auto' }}>{renderButtons(buttons.left)}</Space>
        <Space>{renderButtons(buttons.right)}</Space>
      </div>
    </Form>
  )

  if (type === 'drawer') {
    return (
      <Drawer title={title} width={width} visible={visible} onClose={onCancel}>
        {content}
      </Drawer>
    )
  }

  if (type === 'modal') {
    return (
      <Modal width={width} title={title} visible={visible} onCancel={onCancel} footer={null}>
        {content}
      </Modal>
    )
  }

  return (
    <>
      {title && <div className="form-container-inline-title">{title}</div>}
      {content}
    </>
  )
}
