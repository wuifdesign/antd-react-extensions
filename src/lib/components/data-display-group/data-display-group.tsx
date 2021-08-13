import React from 'react'
import { DataDisplayRow, DataDisplayRowProps } from './data-display-row'

export type DataDisplayGroupProps = {
  title?: string
}

type ChildComponents = {
  Row: React.FC<DataDisplayRowProps>
}

const DataDisplayGroup: React.FC<DataDisplayGroupProps> & ChildComponents = ({ children, title }) => (
  <div className="data-display-row-group">
    {!!title && (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }} className="data-display-row-group-title">
          {title}
        </div>
      </div>
    )}
    {children}
  </div>
)

DataDisplayGroup.Row = DataDisplayRow

export { DataDisplayGroup }
