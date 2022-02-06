import React, { useMemo, useState } from 'react'
import { Layout, Spin } from 'antd'
import { DefaultLayoutProps } from './layouts/default-layout/default-layout'
import { AuthLayoutProps } from './layouts/auth-layout/auth-layout'
import { RouterHistory } from '../../utils/router-history'
import { LayoutContext } from './layout-context'
import { DefaultLayoutProvider } from './layouts/default-layout/default-layout-context'
import { LayoutFullPageLoading } from './components/layout-full-page-loading'
import { RouteLayout } from './components/route-layout'
import { createStyleMap } from '../../utils/create-style-map/create-style-map'
import { EnhancedRouteType } from '../enhanced-routes'
import { enhanceRoutes } from '../enhanced-routes/enhance-routes'
import { useNavigate, useRoutes } from 'react-router-dom'
import { FCWithoutChildren } from '../../utils'

export type AdminLayoutProps = {
  routes: EnhancedRouteType[]
  guardWithLayout?: boolean
  loading?: boolean
  authLayoutProps?: AuthLayoutProps
  defaultLayoutProps?: DefaultLayoutProps
  copyright?: React.ReactNode
}

const styles = createStyleMap({
  layout: { minHeight: '100vh' }
})

const RoutesComponent: FCWithoutChildren<{ routes: EnhancedRouteType[] }> = ({ routes }) => {
  const enhancedRoutes = useMemo(() => enhanceRoutes(routes), [routes])
  const navigate = useNavigate()
  RouterHistory.setNavigateFunction(navigate)
  return useRoutes(enhancedRoutes)
}

/**
 * Default Layout for the Admin Interface. Can be configured for specific needs.
 *
 * LazyLoad Routes:
 * `const DashboardPage = React.lazy(() => import(/* webpackChunkName: "dashboard" *\/'../dashboard.page'))`
 */
export const AdminLayout: FCWithoutChildren<AdminLayoutProps> = ({
  routes,
  guardWithLayout = true,
  loading = false,
  copyright,
  authLayoutProps,
  defaultLayoutProps
}) => {
  const [fullPageLoading, setFullPageLoading] = useState<string | boolean>(false)

  if (loading) {
    return <LayoutFullPageLoading />
  }

  const SelectedRouter = RouterHistory.getRouter()

  return (
    <LayoutContext.Provider
      value={{
        routes,
        fullPageLoading,
        setFullPageLoading,
        guardWithLayout
      }}
    >
      <DefaultLayoutProvider initialSidebarCollapsed={defaultLayoutProps?.initialSidebarCollapsed}>
        <Layout style={styles.layout}>
          <SelectedRouter>
            <RouteLayout
              copyright={copyright}
              defaultLayoutProps={defaultLayoutProps}
              authLayoutProps={authLayoutProps}
            >
              <RoutesComponent routes={routes} />
            </RouteLayout>
          </SelectedRouter>
        </Layout>
        {fullPageLoading !== false && (
          <div className="loading-overlay">
            <Spin size="large" tip={typeof fullPageLoading === 'string' ? fullPageLoading : undefined} />
          </div>
        )}
      </DefaultLayoutProvider>
    </LayoutContext.Provider>
  )
}
