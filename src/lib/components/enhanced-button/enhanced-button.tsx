import React, { useMemo } from 'react'
import { Button, ButtonProps } from 'antd'
import clsx from 'clsx'
import { ButtonGroupProps } from 'antd/lib/button/button-group'
import { ButtonType as AntdButtonType } from 'antd/lib/button/button'

export type ButtonType = AntdButtonType | 'link-inline' | 'text-inline'

export type EnhancedButtonProps = Omit<ButtonProps, 'type'> & {
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
const EnhancedButton: React.FC<EnhancedButtonProps> & ChildComponents = ({
  className,
  type,
  warning,
  success,
  ...props
}) => {
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

  return <Button {...props} className={buttonsClasses} type={buttonType} />
}

EnhancedButton.Group = Button.Group

export { EnhancedButton }
