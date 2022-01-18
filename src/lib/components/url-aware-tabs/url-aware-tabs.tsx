import React from 'react'
import { Tabs, TabsProps } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { getKeysFromChildComponents } from '../../utils'

export type UrlAwareTabsProps = TabsProps & {
  paramName?: string
}

/**
 * Antd Tabs but saving current active tab as url parameter.
 */
export const UrlAwareTabs: React.FC<UrlAwareTabsProps> = ({ paramName = 'tab', activeKey, children, ...tabsProps }) => {
  const childKeys = getKeysFromChildComponents(children)
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
      activeKey={activeKey || searchParams.get(paramName) || tabsProps.defaultActiveKey || childKeys[0]}
    >
      {children}
    </Tabs>
  )
}
