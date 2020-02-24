import React from 'react';
import { Spin } from 'antd';
import PageContentHeader from './page-content-header';

const PageContent = ({
  children,
  style,
  loading = false
}) => /*#__PURE__*/React.createElement("div", {
  className: "page-content",
  style: style
}, loading ? /*#__PURE__*/React.createElement(Spin, {
  size: "large",
  style: {
    margin: '3px auto -2px',
    display: 'block'
  }
}) : children);

PageContent.Header = PageContentHeader;
export default PageContent;