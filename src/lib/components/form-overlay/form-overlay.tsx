import React, { useEffect, useRef, useState } from 'react'
import { Drawer, Form, Modal, Space } from 'antd'
import { FormInstance } from 'antd/es/form'
import { IconUndo } from '../icons'
import Button, { ButtonProps } from '../button/button'
import useTranslations from '../config-provider/use-translations'

export type FormOverlayButtons = 'reset' | 'cancel' | 'submit' | React.ReactNode

export type FormOverlayProps = {
  visible: boolean
  onClose: () => void
  onSubmit: (value: any) => Promise<void>
  width?: number
  title?: string
  type?: 'drawer' | 'modal'
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

const FormOverlay: React.FC<FormOverlayProps> = ({
  visible,
  onClose,
  onSubmit,
  width = 600,
  title,
  type = 'modal',
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
            <Button onClick={onClose} {...cancelButtonProps}>
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
      className="ant-drawer-custom"
      initialValues={initialValues}
    >
      <div className="ant-drawer-custom-body">{children}</div>
      <div className="ant-drawer-custom-footer">
        <Space style={{ marginRight: 'auto' }}>{renderButtons(buttons.left)}</Space>
        <Space>{renderButtons(buttons.right)}</Space>
      </div>
    </Form>
  )

  if (type === 'drawer') {
    return (
      <Drawer title={title} width={width} visible={visible} onClose={onClose}>
        {content}
      </Drawer>
    )
  }

  return (
    <Modal width={width} title={title} visible={visible} onCancel={onClose} footer={null}>
      {content}
    </Modal>
  )
}

export default FormOverlay
