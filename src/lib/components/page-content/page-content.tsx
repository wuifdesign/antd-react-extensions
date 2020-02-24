import React from 'react'
import { Spin } from 'antd'
import PageContentHeader, { PageContentHeaderProps } from './page-content-header'

export type PageContentProps = {
  style?: React.CSSProperties
  loading?: boolean
}

const PageContent: React.FC<PageContentProps> & { Header: React.FC<PageContentHeaderProps> } = ({
  children,
  style,
  loading = false
}) => (
  <div className="page-content" style={style}>
    {loading ? <Spin size="large" style={{ margin: '3px auto -2px', display: 'block' }} /> : children}
  </div>
)

PageContent.Header = PageContentHeader

export default PageContent
