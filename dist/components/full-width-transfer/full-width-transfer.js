function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Transfer } from 'antd';
export const FullWidthTransfer = props => {
  return /*#__PURE__*/React.createElement(Transfer, _extends({
    className: "full-width-transfer ant-transfer-customized-list",
    showSearch: true,
    render: item => item.title || ''
  }, props));
};
export default FullWidthTransfer;