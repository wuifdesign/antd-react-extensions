import React from 'react'
import { Button as AntdButton } from 'antd'
import { ButtonProps as AntdButtonProps } from 'antd/es/button'

export type ButtonProps = AntdButtonProps & {
  warning?: boolean
  success?: boolean
}

/**
 * Add new color options (waring/success) to the default ant design buttons (https://ant.design/components/button/).
 */
export const Button: React.FC<ButtonProps> = ({ warning, success, children, ...props }) => {
  const classNames = []
  if (success) {
    classNames.push('ant-btn-success')
  }
  if (warning) {
    classNames.push('ant-btn-warning')
  }
  return (
    <AntdButton className={classNames.join(' ')} {...props}>
      {children}
    </AntdButton>
  )
}

export default Button
