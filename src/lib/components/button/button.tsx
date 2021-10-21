import React, { useMemo } from 'react'
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd'
import clsx from 'clsx'
import { ButtonGroupProps } from 'antd/lib/button/button-group'
import { ButtonType as AntdButtonType } from 'antd/lib/button/button'

export type ButtonType = AntdButtonType | 'link-inline' | 'text-inline'

export type ButtonProps = Omit<AntdButtonProps, 'type'> & {
  type?: ButtonType
  warning?: boolean
  success?: boolean
}

export type ChildComponents = {
  Group: React.FC<ButtonGroupProps>
}

/**
 * Add new color options (waring/success) to the default ant design buttons (https://ant.design/components/button/).
 */
const Button: React.FC<ButtonProps> & ChildComponents = ({ className, type, warning, success, ...props }) => {
  const buttonsClasses = useMemo(() => {
    return clsx(className, {
      'ant-btn-success': success,
      'ant-btn-warning': warning,
      'btn-text-inline': type === 'text-inline',
      'btn-link-inline': type === 'link-inline'
    })
  }, [className, success, warning, type])

  const buttonType: AntdButtonType | undefined = useMemo(() => {
    if (type === 'link-inline') {
      return 'link'
    }
    if (type === 'text-inline') {
      return 'text'
    }
    return type
  }, [type])

  return <AntdButton {...props} className={buttonsClasses} type={buttonType} />
}

Button.Group = AntdButton.Group

export { Button }
