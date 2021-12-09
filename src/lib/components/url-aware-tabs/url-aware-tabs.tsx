import React from 'react'
import { Tabs, TabsProps } from 'antd'
import { useSearchParams } from 'react-router-dom'

export type UrlAwareTabsProps = TabsProps & {
  paramName?: string
}

/**
 * Antd Tabs but saving current active tab as url parameter.
 */
export const UrlAwareTabs: React.FC<UrlAwareTabsProps> = ({ paramName = 'tab', children, ...tabsProps }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Tabs
      animated={false}
      {...tabsProps}
      onChange={(value) => {
        searchParams.set(paramName, value)
        setSearchParams(searchParams, { replace: true })
        tabsProps.onChange?.(value)
      }}
      defaultActiveKey={searchParams.get(paramName) || tabsProps.defaultActiveKey}
    >
      {children}
    </Tabs>
  )
}
