import React from 'react'
import { Col, Row, Typography } from 'antd'
import { FCWithoutChildren } from '../../utils'

export type DataListElementType = {
  title: React.ReactNode
  content: React.ReactNode
}

export type DataListGroupProps = {
  title?: string
  elements: DataListElementType[] | undefined | null
}

export const DataList: FCWithoutChildren<DataListGroupProps> = ({ elements, title }) => (
  <div className="data-list-group">
    {!!title && (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }} className="data-list-group-title">
          {title}
        </div>
      </div>
    )}
    {elements?.map(({ title, content }, index) => (
      <Row key={index} className="data-list-item">
        <Col xs={24} sm={8} className="data-list-label">
          <Typography.Text ellipsis title={typeof title === 'string' ? title : undefined}>
            {title}
          </Typography.Text>
        </Col>
        <Col xs={24} sm={16} className="data-list-body">
          {content}
        </Col>
      </Row>
    ))}
  </div>
)
