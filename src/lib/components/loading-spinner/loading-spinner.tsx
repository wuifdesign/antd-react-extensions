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
}) => (
  <Spin
    className="loading-spinner"
    size="large"
    style={{ margin: `${marginVertical + marginTopOffset}px auto ${marginVertical}px`, display: 'block' }}
  />
)
