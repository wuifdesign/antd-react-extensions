import React from 'react'
import { EnhancedTabs, EnhancedTabsProps } from '../enhanced-tabs'
import { PageContentElement } from '../page-content/components/page-content-element'

export type PageContentTabsProps = EnhancedTabsProps

export const PageContentTabs: React.FC<PageContentTabsProps> = ({ children, ...props }) => {
  return (
    <EnhancedTabs type="card" className="page-content-tabs" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <>
              {React.cloneElement(child, {
                children: <PageContentElement>{child.props.children}</PageContentElement>
              })}
            </>
          )
        }
        return child
      })}
    </EnhancedTabs>
  )
}
