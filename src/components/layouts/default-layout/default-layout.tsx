import React, { useCallback, useMemo, useState } from 'react';
import { Layout } from 'antd';
import withBreadcrumbs, { BreadcrumbsRoute } from 'react-router-breadcrumbs-hoc';
import useIsMobile from '../../../lib/hooks/use-is-mobile';
import { PAGE_PADDING } from '../admin-layout';
import DefaultLayoutBreadcrumbs from './default-layout-breadcrumbs';
import DefaultLayoutSidebar, { SIDEBAR_WIDTH } from './default-layout-sidebar';
import DefaultLayoutHeader from './default-layout-header';
import { MenuElement } from '../menu-element.type';
import { RouteElement } from '../route-element.type';
import { DefaultLayoutContext } from './default-layout-context';
import useBodyClass from '../../../lib/hooks/use-body-class';

export type DefaultLayoutProps = {
  menu: MenuElement[]
  routes: RouteElement[]
  logo: React.ReactNode | string
  logoMobile?: React.ReactNode | string
  sidebarBottom?: React.ReactNode | string
  sidebarWidth?: number
  sidebarMenuPrepend?: React.ReactNode | string
  sidebarMenuAppend?: React.ReactNode | string
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (
  {
    logo,
    logoMobile = logo,
    routes,
    menu,
    sidebarMenuPrepend,
    sidebarMenuAppend,
    sidebarBottom,
    sidebarWidth = SIDEBAR_WIDTH,
    children,
  },
) => {
  useBodyClass('default-page');

  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const setMobileNavOpenFunction = useCallback((open) => setMobileNavOpen(open), []);

  const BreadCrumbs = useMemo(
    () => withBreadcrumbs(routes as BreadcrumbsRoute[], { disableDefaults: true })(DefaultLayoutBreadcrumbs),
    [routes],
  );

  return (
    <DefaultLayoutContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen: setMobileNavOpenFunction,
      }}
    >
      <DefaultLayoutSidebar
        sidebarBottom={sidebarBottom}
        logo={logo}
        menu={menu}
        sidebarWidth={sidebarWidth}
        menuAppend={sidebarMenuAppend}
        menuPrepend={sidebarMenuPrepend}
      />
      <DefaultLayoutHeader
        logoMobile={logoMobile}
      />
      <Layout
        style={{
          marginTop: 55,
          marginLeft: isMobile ? 0 : sidebarWidth,
          padding: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING,
        }}
      >
        <BreadCrumbs/>
        {children}
      </Layout>
    </DefaultLayoutContext.Provider>
  );
};

export default DefaultLayout;
