import React, { useMemo, useState } from 'react'
import { Layout, Spin } from 'antd'
import { Router } from 'react-router'
import { RouteElementType } from '../dynamic-routes/route-element.type'
import { DefaultLayoutProps } from './layouts/default-layout/default-layout'
import { AuthLayoutProps } from './layouts/auth-layout/auth-layout'
import { RouterHistory } from '../../utils/router-history'
import { LayoutContext, LayoutContextType } from './layout-context'
import { DefaultLayoutProvider } from './layouts/default-layout/default-layout-context'
import { LayoutFullPageLoading } from './components/layout-full-page-loading'
import { RouteLayout, RouteLayoutType } from './components/route-layout'
import { CanActivateFallbackType, DynamicRoutes } from '../dynamic-routes'
import { createStyleMap } from '../../utils/create-style-map/create-style-map'

export type AdminLayoutProps = {
  routes: RouteElementType[]
  canActivateFallback?: CanActivateFallbackType
  loading?: boolean
  authLayoutProps?: AuthLayoutProps
  defaultLayoutProps?: DefaultLayoutProps
  copyright?: React.ReactNode
}

const styles = createStyleMap({
  layout: { minHeight: '100vh' }
})

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
  copyright,
  authLayoutProps,
  defaultLayoutProps
}) => {
  const [fullPageLoading, setFullPageLoading] = useState(false)
  const [layoutType, setLayoutType] = useState<RouteLayoutType>('default')
  const layoutContext: LayoutContextType = useMemo(
    () => ({ routes, fullPageLoading, setFullPageLoading, layoutType, setLayoutType }),
    [routes, fullPageLoading, setFullPageLoading, layoutType, setLayoutType]
  )

  if (loading) {
    return <LayoutFullPageLoading />
  }

  return (
    <LayoutContext.Provider value={layoutContext}>
      <DefaultLayoutProvider initialSidebarCollapsed={defaultLayoutProps?.initialSidebarCollapsed}>
        <Layout style={styles.layout}>
          <Router history={RouterHistory.getHistory()}>
            <RouteLayout
              copyright={copyright}
              defaultLayoutProps={defaultLayoutProps}
              authLayoutProps={authLayoutProps}
            >
              <DynamicRoutes canActivateFallback={canActivateFallback} routes={routes} />
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
