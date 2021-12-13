import React from 'react'
import { Spin } from 'antd'
import { FCWithoutChildren } from '../../utils'

export type LoadingSpinnerProps = {
  marginVertical?: number
  marginTopOffset?: number
}

export const LoadingSpinner: FCWithoutChildren<LoadingSpinnerProps> = ({
  marginVertical = 60,
  marginTopOffset = 0
}) => {
  const mountTime = React.useRef(Date.now())
  const style = {
    '--spinner-rotate-delay': `${-(mountTime.current % 1200)}ms`,
    '--spinner-color-delay': `${-(mountTime.current % 2000)}ms`
  } as React.CSSProperties
  return (
    <Spin
      className="loading-spinner"
      size="large"
      style={{
        margin: `${marginVertical + marginTopOffset}px auto ${marginVertical}px`,
        display: 'block',
        ...style
      }}
    />
  )
}
