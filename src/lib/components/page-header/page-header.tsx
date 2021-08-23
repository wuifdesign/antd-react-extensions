import React from 'react'
import { PageHeader as AntdPageHeader, PageHeaderProps as AntdPageHeaderProps } from 'antd'

export type PageHeaderProps = AntdPageHeaderProps & {
  icon?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, children, ...props }) => (
  <AntdPageHeader
    title={
      <>
        <div>
          {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
          {title}
        </div>
      </>
    }
    style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
    {...props}
  >
    {children}
  </AntdPageHeader>
)
