import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const DefaultLayoutBreadcrumbs = ({
  breadcrumbs
}) => {
  let has404 = false;
  breadcrumbs = breadcrumbs.filter(item => {
    if (item.is404 && !has404) {
      has404 = !has404;
      return true;
    }

    if (typeof item.breadcrumb.type === 'function') {
      return !!item.breadcrumb.type(item);
    }

    return !item.is404;
  });
  return /*#__PURE__*/React.createElement(Breadcrumb, {
    style: {
      marginBottom: 12
    }
  }, breadcrumbs.map(({
    breadcrumb,
    match
  }, index) => /*#__PURE__*/React.createElement(Breadcrumb.Item, {
    key: match.url
  }, index < breadcrumbs.length - 1 ? /*#__PURE__*/React.createElement(Link, {
    to: match.url
  }, breadcrumb) : breadcrumb)));
};

export default DefaultLayoutBreadcrumbs;