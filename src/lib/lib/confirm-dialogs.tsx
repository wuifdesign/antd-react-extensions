import { Modal } from 'antd'
import { IconDelete, IconWarning } from '../components/icons'
import React from 'react'
import { ModalFuncProps } from 'antd/lib/modal/Modal'

export const confirmDelete = (props: ModalFuncProps) => {
  Modal.confirm({
    icon: <IconWarning />,
    content: 'This action cannot be undone.',
    okText: 'Delete',
    okButtonProps: {
      icon: <IconDelete />
    },
    okType: 'danger',
    ...props
  })
}

export const confirmAction = (props: ModalFuncProps) => {
  Modal.confirm({
    icon: <IconWarning />,
    okText: 'Continue',
    okType: 'primary',
    ...props
  })
}
