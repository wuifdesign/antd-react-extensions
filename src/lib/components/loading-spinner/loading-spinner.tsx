import React from 'react'
import { Spin } from 'antd'

export type LoadingSpinnerProps = {
  paddingTopOffset?: number
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ paddingTopOffset = 0 }) => (
  <Spin size="large" style={{ margin: `${60 + paddingTopOffset}px auto 10px`, display: 'block' }} />
)
