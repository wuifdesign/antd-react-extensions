import React from 'react'
import { Col, ColProps } from 'antd'

export type DataDisplayItemProps = ColProps & {
  label: string
  defaultProps?: ColProps
}

export const DataDisplayItem: React.FC<DataDisplayItemProps> = ({ label, defaultProps, children, ...props }) => (
  <Col {...(Object.keys(props).length ? props : defaultProps)}>
    <div className="data-display-label">{label}</div>
    <div className="data-display-body">{children}</div>
  </Col>
)
