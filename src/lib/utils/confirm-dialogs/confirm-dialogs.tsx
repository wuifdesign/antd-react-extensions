import React from 'react'
import { Modal, ModalFuncProps } from 'antd'
import { IconDelete, IconWarning } from '../../components/icons'
import { ConfigContext } from '../../components/config-provider/config-provider'

export const confirmDelete = (props?: ModalFuncProps) => {
  Modal.confirm({
    icon: <IconWarning />,
    content: (
      <ConfigContext.Consumer>
        {({ translations }) => <>{translations.confirmDelete?.content}</>}
      </ConfigContext.Consumer>
    ),
    okText: (
      <ConfigContext.Consumer>
        {({ translations }) => <span>{translations.confirmDelete?.okText}</span>}
      </ConfigContext.Consumer>
    ),
    okButtonProps: {
      icon: <IconDelete />
    },
    okType: 'danger',
    ...props
  })
}

export const confirmAction = (props?: ModalFuncProps) => {
  Modal.confirm({
    icon: <IconWarning />,
    content: (
      <ConfigContext.Consumer>
        {({ translations }) => <>{translations.confirmAction?.content}</>}
      </ConfigContext.Consumer>
    ),
    okText: (
      <ConfigContext.Consumer>
        {({ translations }) => <span>{translations.confirmAction?.okText}</span>}
      </ConfigContext.Consumer>
    ),
    okType: 'primary',
    ...props
  })
}
