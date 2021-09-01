import React from 'react'
import { PageHeader, PageHeaderProps } from 'antd'

export type PageContentHeaderProps = PageHeaderProps & {
  icon?: React.ReactNode
}

export const PageContentHeader: React.FC<PageContentHeaderProps> = ({ icon, title, children, ...props }) => (
  <PageHeader
    title={
      <div>
        {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
        {title}
      </div>
    }
    style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
    {...props}
  >
    {children}
  </PageHeader>
)
