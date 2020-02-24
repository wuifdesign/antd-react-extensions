import React from 'react';
import { Col, Row, Typography } from 'antd';

const DataDisplayRow = ({
  label,
  children
}) => /*#__PURE__*/React.createElement(Row, {
  className: "data-display-row"
}, /*#__PURE__*/React.createElement(Col, {
  xs: 24,
  sm: 8,
  className: "data-display-label"
}, /*#__PURE__*/React.createElement(Typography.Text, {
  ellipsis: true,
  title: label
}, label)), /*#__PURE__*/React.createElement(Col, {
  xs: 24,
  sm: 16,
  className: "data-display-control"
}, children));

export default DataDisplayRow;