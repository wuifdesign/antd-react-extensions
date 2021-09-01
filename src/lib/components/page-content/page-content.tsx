import React from 'react'
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import { LoadingSpinner } from '../loading-spinner'
import { PageContentHeader, PageContentHeaderProps } from './components/page-content-header'
import { PageContentElement, PageContentElementProps } from './components/page-content-element'

export type PageContentProps = {
  style?: React.CSSProperties
  loading?: boolean
  hideBreadcrumbs?: boolean
}

type ChildComponents = {
  Header: React.FC<PageContentHeaderProps>
  Element: React.FC<PageContentElementProps>
}

const PageContent: React.FC<PageContentProps> & ChildComponents = ({
  children,
  hideBreadcrumbs,
  style,
  loading = false
}) => (
  <div className="page-content" style={style}>
    {!hideBreadcrumbs && <Breadcrumbs />}
    {loading ? <LoadingSpinner paddingTopOffset={!hideBreadcrumbs ? -18 : 0} /> : children}
  </div>
)

PageContent.Header = PageContentHeader
PageContent.Element = PageContentElement

export { PageContent }
