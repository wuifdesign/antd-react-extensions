import React from 'react';
import DataDisplayRow from './data-display-row';

const DataDisplayGroup = ({
  children,
  title
}) => /*#__PURE__*/React.createElement("div", {
  className: "data-display-row-group"
}, !!title && /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1
  },
  className: "data-display-row-group-title"
}, title)), children);

DataDisplayGroup.Row = DataDisplayRow;
export default DataDisplayGroup;