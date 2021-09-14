import React from 'react'
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd'
import clsx from 'clsx'
import { ButtonGroupProps } from 'antd/lib/button/button-group'

export type ButtonProps = AntdButtonProps & {
  asText?: boolean
  warning?: boolean
  success?: boolean
}

export type ChildComponents = {
  Group: React.FC<ButtonGroupProps>
}

/**
 * Add new color options (waring/success) to the default ant design buttons (https://ant.design/components/button/).
 */
const Button: React.FC<ButtonProps> & ChildComponents = ({
  warning,
  className,
  success,
  asText,
  type,
  children,
  ...props
}) => (
  <AntdButton
    {...props}
    className={clsx(className, { 'ant-btn-success': success, 'ant-btn-warning': warning, 'as-text': asText })}
    type={asText ? 'text' : type}
  >
    {children}
  </AntdButton>
)

Button.Group = AntdButton.Group

export { Button }
