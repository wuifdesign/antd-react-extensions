function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Button as AntdButton } from 'antd';

/**
 * Add new color options (waring/success) to the default ant design buttons (https://ant.design/components/button/).
 */
export const Button = ({
  warning,
  success,
  children,
  ...props
}) => {
  const classNames = [];

  if (success) {
    classNames.push('ant-btn-success');
  }

  if (warning) {
    classNames.push('ant-btn-warning');
  }

  return /*#__PURE__*/React.createElement(AntdButton, _extends({
    className: classNames.join(' ')
  }, props), children);
};
export default Button;