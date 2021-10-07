import React, { useState } from 'react'
import { Layout, Spin } from 'antd'
import { Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { CustomLayoutRouteElement, RouteElement } from './route-element.type'
import { DefaultLayout, DefaultLayoutProps } from './layouts/default-layout/default-layout'
import { AuthLayout, AuthLayoutProps } from './layouts/auth-layout/auth-layout'
import { BlankLayout } from './layouts/blank-layout/blank-layout'
import { RouterHistory, RouterHistoryTypesType } from '../../utils/router-history'
import { LayoutContext } from './layout-context'
import { DefaultLayoutProvider } from './layouts/default-layout/default-layout-context'
import { LayoutFullPageLoading } from './components/layout-full-page-loading'
import { RouteWithSubRoutes } from './components/route-with-sub-routes'

export type AdminLayoutProps = {
  routes: RouteElement[]
  canActivateFallback?: CanActivateFallbackType
  loading?: boolean
  history?: RouterHistoryTypesType
  authLayoutProps?: AuthLayoutProps
  defaultLayoutProps?: DefaultLayoutProps
}

export type CanActivateFallbackType = {
  renderLayout?: boolean
  component: React.ReactNode
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
    return <LayoutFullPageLoading />
  }

  return (
    <LayoutContext.Provider value={{ routes, fullPageLoading, setFullPageLoading }}>
      <DefaultLayoutProvider initialSidebarCollapsed={defaultLayoutProps?.initialSidebarCollapsed}>
        <Layout style={{ minHeight: '100vh' }}>
          <Router history={RouterHistory.getHistory()}>
            <Switch>
              {routes.map((route, i) => {
                const layoutRoute: CustomLayoutRouteElement = { ...(route as any) }
                if (route.layout === 'blank') {
                  layoutRoute.layout = BlankLayout
                } else if (route.layout === 'auth') {
                  layoutRoute.layout = AuthLayout
                  layoutRoute.layoutProps = {
                    ...authLayoutProps,
                    ...layoutRoute.layoutProps
                  }
                } else if (route.layout === 'default' || !route.layout) {
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
                layoutRoute.canActivateFallbackBase = canActivateFallback
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
      </DefaultLayoutProvider>
    </LayoutContext.Provider>
  )
}
