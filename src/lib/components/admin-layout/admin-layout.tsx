import React, { Suspense, useState } from 'react'
import { Layout, Spin } from 'antd'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { ErrorBoundary } from '../error-boundary/error-boundary'
import { CustomLayoutRouteElement, RouteElement } from './route-element.type'
import { DefaultLayout, DefaultLayoutProps } from './default-layout/default-layout'
import { AuthLayout, AuthLayoutProps } from './auth-layout/auth-layout'
import { BlankLayout } from './blank-layout/blank-layout'
import { RouterHistory, RouterHistoryTypesType } from '../../utils/router-history'
import { LayoutContext } from './layout-context'
import { ErrorPage } from '../error-page'
import { LoadingSpinner } from '../loading-spinner'

const RouteWithSubRoutes = (route: CustomLayoutRouteElement) => {
  let withLayout = true
  const canActivate = route.canActivate ? route.canActivate(route) : true
  if (!canActivate) {
    if (typeof route.baseCanActivateFallback !== 'undefined') {
      withLayout = route.baseCanActivateFallback.renderLayout === true
    }
    if (typeof route.canActivateFallback !== 'undefined') {
      withLayout = route.canActivateFallback.renderLayout === true
    }
  }
  const routeFallback = route.canActivateFallback?.component || route.baseCanActivateFallback?.component || (
    <ErrorPage type={403} />
  )
  const routeElement = (props: RouteComponentProps<any>) => {
    if (typeof canActivate === 'undefined') {
      return <LoadingSpinner />
    }
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {canActivate ? <route.component {...props} routes={route.routes} /> : routeFallback}
        </Suspense>
      </ErrorBoundary>
    )
  }

  return (
    <Route
      path={route.path}
      exact={!!route.exact}
      render={(props) => (
        <>
          {withLayout ? <route.layout {...route.layoutProps}>{routeElement(props)}</route.layout> : routeElement(props)}
        </>
      )}
    />
  )
}

export type CanActivateFallbackType = {
  renderLayout?: boolean
  component?: React.ReactNode
}

export type AdminLayoutProps = {
  routes: RouteElement[]
  canActivateFallback?: CanActivateFallbackType
  loading?: boolean
  history?: RouterHistoryTypesType
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
  canActivateFallback,
  loading = false,
  history,
  authLayoutProps,
  defaultLayoutProps
}) => {
  const [fullPageLoading, setFullPageLoading] = useState(false)
  RouterHistory.setHistoryByType(history)

  if (loading) {
    return (
      <div className="page-loading">
        <Spin size="large" tip="Loading..." />
      </div>
    )
  }

  return (
    <LayoutContext.Provider value={{ routes, fullPageLoading, setFullPageLoading }}>
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
              layoutRoute.baseCanActivateFallback = canActivateFallback
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
