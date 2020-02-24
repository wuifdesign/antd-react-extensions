import React from 'react';
import { Layout } from 'antd';
import useIsMobile from '../../../lib/hooks/use-is-mobile';
import useBodyClass from '../../../lib/hooks/use-body-class';
import { PageContent } from '../../page-content';
import { PAGE_PADDING } from '../admin-layout-config';
export const AuthLayout = ({
  logo,
  authPageMaxWidth = 400,
  children
}) => {
  useBodyClass('auth-page');
  const isMobile = useIsMobile();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Layout, {
    className: "auth-container",
    style: {
      padding: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(PageContent, {
    style: {
      width: '100%',
      maxWidth: authPageMaxWidth
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-logo-container",
    style: {
      marginBottom: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING,
      display: 'flex',
      justifyContent: 'center'
    }
  }, logo), children)));
};
export default AuthLayout;