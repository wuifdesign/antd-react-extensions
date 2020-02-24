import React from 'react';

export type DataDisplayGroupProps = {
  title?: string
}

export const DataDisplayRowGroup: React.FC<DataDisplayGroupProps> = ({ children, title }) => (
  <div className="data-display-row-group">
    {!!title && (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }} className="data-display-row-group-title">{title}</div>
      </div>
    )}
    {children}
  </div>
);

export default DataDisplayRowGroup;
