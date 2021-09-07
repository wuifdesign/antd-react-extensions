import React from 'react'
import { DataDisplayItem, DataDisplayItemProps } from './data-display-item'
import { Row, RowProps } from 'antd'
import { ColProps } from 'antd/lib/grid/col'

export type DataDisplayProps = RowProps & {
  column?: ColProps
}

type ChildComponents = {
  Item: React.FC<DataDisplayItemProps>
}

const DataDisplay: React.FC<DataDisplayProps> & ChildComponents = ({
  column = { xs: 24, sm: 12, md: 6 },
  children,
  ...props
}) => (
  <Row gutter={[16, 16]} {...props}>
    {React.Children.toArray(children).map((element) =>
      typeof element !== 'string' && typeof element !== 'number'
        ? React.cloneElement(element as any, { defaultProps: column })
        : element
    )}
  </Row>
)

DataDisplay.Item = DataDisplayItem

export { DataDisplay }
