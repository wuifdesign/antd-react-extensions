import React, { useCallback, useMemo, useState } from 'react';
import { Layout } from 'antd';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import useIsMobile from '../../../lib/hooks/use-is-mobile';
import DefaultLayoutBreadcrumbs from './default-layout-breadcrumbs';
import DefaultLayoutSidebar, { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from './default-layout-sidebar';
import DefaultLayoutHeader from './default-layout-header';
import { DefaultLayoutContext } from './default-layout-context';
import useBodyClass from '../../../lib/hooks/use-body-class';
import { PAGE_PADDING } from '../admin-layout-config';
export const DefaultLayout = ({
  logo,
  logoMobile = logo,
  logoCollapsed,
  routes,
  menu,
  hideFrame = false,
  hideBreadcrumbs = false,
  sidebarMenuPrepend,
  sidebarMenuPrependCollapsed = sidebarMenuPrepend,
  sidebarMenuAppend,
  sidebarMenuAppendCollapsed = sidebarMenuAppend,
  sidebarBottom,
  sidebarTheme = 'light',
  headerRight,
  sidebarWidth = SIDEBAR_WIDTH,
  sidebarCollapsedWidth = SIDEBAR_COLLAPSED_WIDTH,
  children
}) => {
  useBodyClass('default-page');
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const setMobileNavOpenFunction = useCallback(open => setMobileNavOpen(open), []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const setSidebarCollapsedFunction = useCallback(open => setSidebarCollapsed(open), []);
  const BreadCrumbs = useMemo(() => withBreadcrumbs(routes, {
    disableDefaults: true
  })(DefaultLayoutBreadcrumbs), [routes]);
  let currentSidebarWidth = sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth;

  if (hideFrame) {
    currentSidebarWidth = 0;
  }

  return /*#__PURE__*/React.createElement(DefaultLayoutContext.Provider, {
    value: {
      mobileNavOpen,
      setMobileNavOpen: setMobileNavOpenFunction,
      sidebarCollapsed: sidebarCollapsed,
      setSidebarCollapsed: setSidebarCollapsedFunction
    }
  }, !hideFrame && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DefaultLayoutSidebar, {
    sidebarBottom: sidebarBottom,
    logo: logo,
    logoCollapsed: logoCollapsed,
    menu: menu,
    sidebarTheme: sidebarTheme,
    sidebarWidth: sidebarWidth,
    sidebarCollapsedWidth: sidebarCollapsedWidth,
    menuAppend: sidebarCollapsed ? sidebarMenuAppendCollapsed : sidebarMenuAppend,
    menuPrepend: sidebarCollapsed ? sidebarMenuPrependCollapsed : sidebarMenuPrepend
  }), /*#__PURE__*/React.createElement(DefaultLayoutHeader, {
    logoMobile: logoMobile,
    headerRight: headerRight,
    sidebarWidth: sidebarWidth,
    sidebarCollapsedWidth: sidebarCollapsedWidth
  })), /*#__PURE__*/React.createElement(Layout, {
    className: "ant-layout-content",
    style: {
      marginTop: hideFrame ? 0 : undefined,
      marginLeft: isMobile ? 0 : currentSidebarWidth,
      padding: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING
    }
  }, !hideBreadcrumbs && /*#__PURE__*/React.createElement(BreadCrumbs, null), children));
};
export default DefaultLayout;