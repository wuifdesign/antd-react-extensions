import React, { useState } from 'react'
import { Layout, Spin } from 'antd'
import { Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { RouteElementType } from './route-element.type'
import { DefaultLayoutProps } from './layouts/default-layout/default-layout'
import { AuthLayoutProps } from './layouts/auth-layout/auth-layout'
import { RouterHistory, RouterHistoryTypesType } from '../../utils/router-history'
import { LayoutContext } from './layout-context'
import { DefaultLayoutProvider } from './layouts/default-layout/default-layout-context'
import { LayoutFullPageLoading } from './components/layout-full-page-loading'
import { RouteElement } from './components/route-element'
import { RouteLayout, RouteLayoutType } from './components/route-layout'

export type AdminLayoutProps = {
  routes: RouteElementType[]
  canActivateFallback?: CanActivateFallbackType
  loading?: boolean
  history?: RouterHistoryTypesType
  authLayoutProps?: AuthLayoutProps
  defaultLayoutProps?: DefaultLayoutProps
  copyright?: React.ReactNode
}

export type CanActivateFallbackType = {
  renderLayout?: boolean
  component?: React.ReactNode
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
  copyright,
  authLayoutProps,
  defaultLayoutProps
}) => {
  const [fullPageLoading, setFullPageLoading] = useState(false)
  const [layoutType, setLayoutType] = useState<RouteLayoutType>('default')
  RouterHistory.setHistoryByType(history)

  if (loading) {
    return <LayoutFullPageLoading />
  }

  return (
    <LayoutContext.Provider value={{ routes, fullPageLoading, setFullPageLoading, layoutType, setLayoutType }}>
      <DefaultLayoutProvider initialSidebarCollapsed={defaultLayoutProps?.initialSidebarCollapsed}>
        <Layout style={{ minHeight: '100vh' }}>
          <Router history={RouterHistory.getHistory()}>
            <RouteLayout
              copyright={copyright}
              defaultLayoutProps={defaultLayoutProps}
              authLayoutProps={authLayoutProps}
            >
              <Switch>
                {routes.map((route, i) => (
                  <RouteElement key={i} canActivateFallbackBase={canActivateFallback} {...route} />
                ))}
              </Switch>
            </RouteLayout>
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
