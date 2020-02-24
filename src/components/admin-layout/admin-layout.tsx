import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { Layout, Spin } from 'antd';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import withBreadcrumbs, { BreadcrumbsRoute } from 'react-router-breadcrumbs-hoc';
import ErrorBoundary from '../error-boundary/error-boundary';
import useIsMobile from '../../lib/hooks/use-is-mobile';
import PageContent from '../page-content/page-content';
import { RouteElement } from './route-element.type';
import AdminLayoutSidebar, { SIDEBAR_WIDTH } from './admin-layout-sidebar';
import { MenuElement } from './menu-element.type';
import AdminLayoutHeader from './admin-layout-header';
import { AdminLayoutContext } from './admin-layout-context';
import AdminLayoutBreadcrumbs from './admin-layout-breadcrumbs';

const { Content } = Layout;

export const PAGE_PADDING = 24;

const RouteWithSubRoutes = (route: RouteElement) => (
  <ErrorBoundary>
    <Route
      path={route.path}
      exact={!!route.exact}
      render={(props) => <route.component {...props} routes={route.routes}/>}
    />
  </ErrorBoundary>
);

export type AdminLayoutProps = {
  menu: MenuElement[]
  routes: RouteElement[]
  logo: React.ReactNode | string
  logoMobile?: React.ReactNode | string
  sidebarBottom?: React.ReactNode | string
  loading?: boolean
  useHashRouter?: boolean
  sideBarWidth?: number
  sideBarMenuPrepend?: React.ReactNode | string
  sideBarMenuAppend?: React.ReactNode | string
}

/**
 * Default Layout for the Admin Interface. Can be configured for specific needs.
 */
export const AdminLayout: React.FC<AdminLayoutProps> = (
  {
    logo,
    logoMobile = logo,
    routes,
    menu,
    sideBarMenuPrepend,
    sideBarMenuAppend,
    sidebarBottom,
    loading = false,
    sideBarWidth = SIDEBAR_WIDTH,
    useHashRouter = false,
  },
) => {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const setMobileNavOpenFunction = useCallback((open) => setMobileNavOpen(open), []);
  const BreadCrumbs = useMemo(
    () => withBreadcrumbs(routes as BreadcrumbsRoute[], { disableDefaults: true })(AdminLayoutBreadcrumbs),
    [routes],
  );

  if (loading) {
    return (
      <div
        className="page-loading"
        style={{
          display: 'flex',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f0f2f5',
        }}
      >
        <Spin size="large" tip="Loading..."/>
      </div>
    );
  }

  const content = (
    <AdminLayoutContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen: setMobileNavOpenFunction,
      }}
    >
      <AdminLayoutSidebar
        sidebarBottom={sidebarBottom}
        logo={logo}
        menu={menu}
        sidebarWidth={sideBarWidth}
        menuAppend={sideBarMenuAppend}
        menuPrepend={sideBarMenuPrepend}
      />
      <AdminLayoutHeader
        logoMobile={logoMobile}
      />
      <Layout
        style={{
          marginTop: 55,
          marginLeft: isMobile ? 0 : sideBarWidth,
          padding: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING,
        }}
      >
        <BreadCrumbs/>
        <Content>
          <Suspense
            fallback={(
              <PageContent style={{ textAlign: 'center' }}>
                <Spin/>
              </PageContent>
            )}
          >
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
              ))}
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </AdminLayoutContext.Provider>
  );

  if (useHashRouter) {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <HashRouter>
          {content}
        </HashRouter>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <BrowserRouter>
        {content}
      </BrowserRouter>
    </Layout>
  );
};

export default AdminLayout;
