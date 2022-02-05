import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Drawer, Form, FormProps, Modal, Space } from 'antd'
import { FormInstance } from 'antd/es/form'
import { IconUndo } from '../icons'
import { Button, ButtonProps } from '../button/button'
import { useTranslations } from '../config-provider/use-translations'
import clsx from 'clsx'
import { LoadingSpinner } from '../loading-spinner'
import { FormLayout } from 'antd/es/form/Form'
import { HtmlDataProps } from '../../types/html-data-props.type'

export type FormOverlayButtons = 'reset' | 'cancel' | 'submit' | React.ReactNode

export type FormContainerHandles = {
  getFormRef: () => FormInstance | null
}

export type FormContainerProps = {
  visible?: boolean
  onCancel?: () => void
  name?: string
  formLoading?: boolean
  onSubmit: (value: any) => Promise<void>
  width?: number
  title?: string
  type?: 'drawer' | 'modal' | 'inline'
  formLayout?: FormLayout
  submitButtonProps?: ButtonProps & HtmlDataProps
  submitButtonText?: string
  submitButtonIcon?: React.ReactNode
  submitButtonDisabled?: boolean
  cancelButtonProps?: ButtonProps & HtmlDataProps
  cancelButtonText?: string
  buttons?: {
    left: FormOverlayButtons[]
    right: FormOverlayButtons[]
  }
  initialValues?: object
  formProps?: FormProps
}

export const FormContainer: React.FC<FormContainerProps> = React.forwardRef<FormContainerHandles, FormContainerProps>(
  (
    {
      visible = true,
      onCancel,
      name,
      formLoading,
      onSubmit,
      width = 600,
      title,
      type = 'inline',
      formLayout = 'vertical',
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
      formProps,
      children
    },
    ref
  ) => {
    const formRef = useRef<FormInstance>(null)
    const [loading, setLoading] = useState(false)
    const translations = useTranslations()

    useImperativeHandle(ref, () => ({
      getFormRef: () => formRef.current
    }))

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
                key="submit"
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
              <Button key="cancel" onClick={onCancel} {...cancelButtonProps}>
                {cancelButtonText || translations.FormOverlay.btnCancel}
              </Button>
            )
            break
          case 'reset':
            parsedButtons.push(
              <Button
                key="reset"
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
      return parsedButtons
    }

    let content = (
      <Form
        ref={formRef}
        name={name}
        onFinish={triggerSubmit}
        layout={formLayout}
        className={clsx('form-container', { 'form-container-inline': type === 'inline' })}
        initialValues={initialValues}
        {...formProps}
      >
        <div className="form-container-body">{children}</div>
        <div className="form-container-footer">
          <Space style={{ marginRight: 'auto' }}>{renderButtons(buttons.left)}</Space>
          <Space>{renderButtons(buttons.right)}</Space>
        </div>
      </Form>
    )

    if (formLoading) {
      content = <LoadingSpinner />
    }

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
)
