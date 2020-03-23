import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import PageContent from '../page-content/page-content';
import { CustomLayoutRouteElement } from './route-element.type';
import { SIDEBAR_WIDTH } from './default-layout/default-layout-sidebar';
import DefaultLayout, { DefaultLayoutProps } from './default-layout/default-layout';
import AuthLayout, { AuthLayoutProps } from './auth-layout/auth-layout';
import BlankLayout from './blank-layout/blank-layout';

export const PAGE_PADDING = 24;

const RouteWithSubRoutes = (route: CustomLayoutRouteElement) => (
  <ErrorBoundary>
    <Route
      path={route.path}
      exact={!!route.exact}
      render={(props) => (
        <route.layout {...route.layoutProps}>
          <route.component {...props} routes={route.routes}/>
        </route.layout>
      )}
    />
  </ErrorBoundary>
);

export type AdminLayoutProps = DefaultLayoutProps & AuthLayoutProps & {
  loading?: boolean
  useHashRouter?: boolean
}

/**
 * Default Layout for the Admin Interface. Can be configured for specific needs.
 *
 * LazyLoad Routes:
 * `const DashboardPage = React.lazy(() => import(/* webpackChunkName: "dashboard" *\/'../dashboard.page'));`
 */
export const AdminLayout: React.FC<AdminLayoutProps> = (
  {
    logo,
    logoMobile = logo,
    routes,
    menu,
    sidebarMenuPrepend,
    sidebarMenuAppend,
    sidebarBottom,
    loading = false,
    sidebarWidth = SIDEBAR_WIDTH,
    useHashRouter = false,
  },
) => {
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
    <Suspense
      fallback={(
        <PageContent style={{ textAlign: 'center' }}>
          <Spin/>
        </PageContent>
      )}
    >
      <Switch>
        {routes.map((route, i) => {
          const layoutRoute: CustomLayoutRouteElement = { ...route as any };
          if (route.layout === 'blank') {
            layoutRoute.layout = BlankLayout;
          }
          if (route.layout === 'auth') {
            layoutRoute.layout = AuthLayout;
            (layoutRoute.layoutProps as AuthLayoutProps) = {
              logo,
              ...layoutRoute.layoutProps,
            };
          }
          if (route.layout === 'default' || !route.layout) {
            layoutRoute.layout = DefaultLayout;
            (layoutRoute.layoutProps as DefaultLayoutProps) = {
              menu,
              routes,
              logo,
              logoMobile,
              sidebarBottom,
              sidebarWidth,
              sidebarMenuPrepend,
              sidebarMenuAppend,
              ...layoutRoute.layoutProps,
            };
          }
          if (typeof layoutRoute.layout === 'string') {
            throw new Error(`'Layout with name ${layoutRoute.layout} not supported!`);
          }
          return (
            <RouteWithSubRoutes key={i} {...layoutRoute as any}/>
          );
        })}
      </Switch>
    </Suspense>
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
