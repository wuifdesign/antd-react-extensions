import React from 'react';
import { Col, Row, Typography } from 'antd';

import './data-display.css';

export type DataDisplayRowProps = {
  label: string
}

export const DataDisplayRow: React.FC<DataDisplayRowProps> = ({ label, children }) => (
  <Row className="data-display-row">
    <Col xs={24} sm={8} className="data-display-label">
      <Typography.Text ellipsis title={label}>{label}</Typography.Text>
    </Col>
    <Col xs={24} sm={16} className="data-display-control">
      {children}
    </Col>
  </Row>
);

export default DataDisplayRow;
