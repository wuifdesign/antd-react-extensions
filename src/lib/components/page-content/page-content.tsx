import React from 'react'
import { Spin } from 'antd'
import Breadcrumbs from '../breadcrumbs/breadcrumbs'

export type PageContentProps = {
  style?: React.CSSProperties
  loading?: boolean
  hideBreadcrumbs?: boolean
}

const PageContent: React.FC<PageContentProps> = ({ children, hideBreadcrumbs, style, loading = false }) => (
  <div className="page-content" style={style}>
    {!hideBreadcrumbs && <Breadcrumbs />}
    {loading ? <Spin size="large" style={{ margin: '3px auto -2px', display: 'block' }} /> : children}
  </div>
)

export { PageContent }
