import React from 'react'
import { Card } from 'antd'

export type PageElementProps = {
  title?: React.ReactNode
  subTitle?: React.ReactNode
  extra?: React.ReactNode
  removeBodyPadding?: true
}

export const PageElement: React.FC<PageElementProps> = ({ title, subTitle, extra, removeBodyPadding, children }) => (
  <Card
    className="page-content-element"
    title={
      (title || subTitle) && (
        <>
          <div className="page-content-title">{title}</div>
          <div className="page-content-sub-title">{subTitle}</div>
        </>
      )
    }
    extra={extra}
    bordered={false}
    bodyStyle={{ padding: removeBodyPadding ? 0 : undefined }}
  >
    {children}
  </Card>
)
