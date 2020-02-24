function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { PageHeader } from 'antd';

const PageContentHeader = ({
  icon,
  title,
  children,
  ...props
}) => /*#__PURE__*/React.createElement(PageHeader, _extends({
  title: /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 8
    }
  }, icon), title),
  style: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0
  }
}, props), children);

export default PageContentHeader;