import React from 'react'
import { Col, Row, RowProps, ColProps } from 'antd'

export type DataDisplayElementType = {
  title: React.ReactNode
  content: React.ReactNode
  col?: ColProps
}

export type DataDisplayProps = RowProps & {
  col?: ColProps
  elements: DataDisplayElementType[] | undefined | null
}

export const DataDisplay: React.FC<DataDisplayProps> = ({
  col: defaultColProps = { xs: 24, sm: 12, md: 6 },
  elements,
  ...props
}) => (
  <Row gutter={[16, 16]} {...props}>
    {elements?.map(({ title, content, col }, index) => (
      <Col key={index} {...(col || defaultColProps)}>
        <div className="data-display-label">{title}</div>
        <div className="data-display-body">{content}</div>
      </Col>
    ))}
  </Row>
)
