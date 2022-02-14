import React, { useState } from 'react'
import { Layout, Spin } from 'antd'
import { LayoutContext } from './layout-context'
import { AdminLayoutProvider } from './layouts/admin-layout/admin-layout-context'
import { LayoutFullPageLoading } from './components/layout-full-page-loading'
import { createStyleMap } from '../../utils/create-style-map/create-style-map'
import { ErrorBoundary } from '../..'

export type EnhancedLayoutProps = {
  loading?: boolean
  initialSidebarCollapsed?: boolean
  copyright?: React.ReactNode
  errorBoundaryFallback?: React.ReactNode
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
export const EnhancedLayout: React.FC<EnhancedLayoutProps> = ({
  loading = false,
  initialSidebarCollapsed,
  errorBoundaryFallback,
  children
}) => {
  const [fullPageLoading, setFullPageLoading] = useState<string | boolean>(false)

  if (loading) {
    return <LayoutFullPageLoading />
  }

  return (
    <LayoutContext.Provider value={{ fullPageLoading, setFullPageLoading }}>
      <AdminLayoutProvider initialSidebarCollapsed={initialSidebarCollapsed}>
        <Layout style={styles.layout}>
          <ErrorBoundary fallback={errorBoundaryFallback}>{children}</ErrorBoundary>
        </Layout>
        {fullPageLoading !== false && (
          <div className="loading-overlay">
            <Spin size="large" tip={typeof fullPageLoading === 'string' ? fullPageLoading : undefined} />
          </div>
        )}
      </AdminLayoutProvider>
    </LayoutContext.Provider>
  )
}
