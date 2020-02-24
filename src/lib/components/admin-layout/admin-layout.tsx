import React, { Suspense, useState } from 'react'
import { Layout, Spin } from 'antd'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import ErrorBoundary from '../error-boundary/error-boundary'
import { CustomLayoutRouteElement, RouteElement } from './route-element.type'
import DefaultLayout, { DefaultLayoutProps } from './default-layout/default-layout'
import AuthLayout, { AuthLayoutProps } from './auth-layout/auth-layout'
import BlankLayout from './blank-layout/blank-layout'
import RouterHistory from '../../lib/router-history'
import { LayoutContext } from './layout-context'

const RouteWithSubRoutes = (route: CustomLayoutRouteElement) => (
  <Route
    path={route.path}
    exact={!!route.exact}
    render={(props) => (
      <route.layout {...route.layoutProps}>
        <ErrorBoundary>
          <Suspense
            fallback={
              <div style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
                <Spin />
              </div>
            }
          >
            <route.component {...props} routes={route.routes} />
          </Suspense>
        </ErrorBoundary>
      </route.layout>
    )}
  />
)

export type AdminLayoutProps = {
  routes: RouteElement[]
  loading?: boolean
  useHashRouter?: boolean
  authLayoutProps?: AuthLayoutProps
  defaultLayoutProps?: DefaultLayoutProps
}

/**
 * Default Layout for the Admin Interface. Can be configured for specific needs.
 *
 * LazyLoad Routes:
 * `const DashboardPage = React.lazy(() => import(/* webpackChunkName: "dashboard" *\/'../dashboard.page'))`
 */
export const AdminLayout: React.FC<AdminLayoutProps> = ({
  routes,
  loading = false,
  useHashRouter = false,
  authLayoutProps,
  defaultLayoutProps
}) => {
  const [fullPageLoading, setFullPageLoading] = useState(false)
  RouterHistory.setHistoryByType(useHashRouter ? 'hash' : 'browser')

  if (loading) {
    return (
      <div className="page-loading">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

  return (
    <LayoutContext.Provider value={{ fullPageLoading, setFullPageLoading }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Router history={RouterHistory.getHistory()}>
          <Switch>
            {routes.map((route, i) => {
              const layoutRoute: CustomLayoutRouteElement = { ...(route as any) }
              if (route.layout === 'blank') {
                layoutRoute.layout = BlankLayout
              }
              if (route.layout === 'auth') {
                layoutRoute.layout = AuthLayout
                layoutRoute.layoutProps = {
                  ...authLayoutProps,
                  ...layoutRoute.layoutProps
                }
              }
              if (route.layout === 'default' || !route.layout) {
                layoutRoute.layout = DefaultLayout
                layoutRoute.layoutProps = {
                  routes: routes,
                  ...defaultLayoutProps,
                  ...layoutRoute.layoutProps
                }
              }
              if (typeof layoutRoute.layout === 'string') {
                throw new Error(`'Layout with name ${layoutRoute.layout} not supported!`)
              }
              return <RouteWithSubRoutes key={i} {...(layoutRoute as any)} />
            })}
          </Switch>
        </Router>
      </Layout>
      {fullPageLoading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
    </LayoutContext.Provider>
  )
}

export default AdminLayout
