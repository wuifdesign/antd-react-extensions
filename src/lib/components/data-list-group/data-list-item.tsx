import React from 'react'
import { Col, Row, Typography } from 'antd'

export type DataListItemProps = {
  label: string
}

export const DataListItem: React.FC<DataListItemProps> = ({ label, children }) => (
  <Row className="data-list-item">
    <Col xs={24} sm={8} className="data-list-label">
      <Typography.Text ellipsis title={label}>
        {label}
      </Typography.Text>
    </Col>
    <Col xs={24} sm={16} className="data-list-body">
      {children}
    </Col>
  </Row>
)
