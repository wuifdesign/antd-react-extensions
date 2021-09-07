import React from 'react'
import { DataListItem, DataListItemProps } from './data-list-item'

export type DataListGroupProps = {
  title?: string
}

type ChildComponents = {
  Item: React.FC<DataListItemProps>
}

const DataListGroup: React.FC<DataListGroupProps> & ChildComponents = ({ children, title }) => (
  <div className="data-list-group">
    {!!title && (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }} className="data-list-group-title">
          {title}
        </div>
      </div>
    )}
    {children}
  </div>
)

DataListGroup.Item = DataListItem

export { DataListGroup }
