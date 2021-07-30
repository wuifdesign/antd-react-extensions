import React from 'react'
import { Button as AntdButton } from 'antd'
import { ButtonProps as AntdButtonProps } from 'antd/es/button'
import clsx from 'clsx'

export type ButtonProps = AntdButtonProps & {
  warning?: boolean
  success?: boolean
}

/**
 * Add new color options (waring/success) to the default ant design buttons (https://ant.design/components/button/).
 */
export const Button: React.FC<ButtonProps> = ({ warning, success, children, ...props }) => {
  return (
    <AntdButton className={clsx({ 'ant-btn-success': success, 'ant-btn-warning': warning })} {...props}>
      {children}
    </AntdButton>
  )
}

export default Button
