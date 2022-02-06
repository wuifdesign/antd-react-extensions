import React from 'react'
import { Spin, SpinProps } from 'antd'
import { FCWithoutChildren } from '../../utils'
import clsx from 'clsx'

export type LoadingSpinnerProps = SpinProps & {
  marginVertical?: number
  marginTopOffset?: number
}

export const LoadingSpinner: FCWithoutChildren<LoadingSpinnerProps> = ({
  marginVertical = 60,
  marginTopOffset = 0,
  className,
  style,
  ...props
}) => {
  const mountTime = React.useRef(Date.now())
  return (
    <Spin
      size="large"
      {...props}
      className={clsx('loading-spinner', className)}
      style={{
        margin: `${marginVertical + marginTopOffset}px auto ${marginVertical}px`,
        display: 'block',
        ...({
          '--spinner-rotate-delay': `${-(mountTime.current % 1200)}ms`,
          '--spinner-color-delay': `${-(mountTime.current % 2000)}ms`
        } as React.CSSProperties),
        ...style
      }}
    />
  )
}
