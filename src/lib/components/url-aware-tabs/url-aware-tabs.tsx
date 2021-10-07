import React, { useMemo } from 'react'
import { Tabs, TabsProps } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import { addUrlParameters } from '../../utils/add-url-parameters'

export type UrlAwareTabsProps = TabsProps & {
  paramName?: string
}

/**
 * Antd Tabs but saving current active tab as url parameter.
 */
export const UrlAwareTabs: React.FC<UrlAwareTabsProps> = ({ paramName = 'tab', children, ...tabsProps }) => {
  const history = useHistory()
  const location = useLocation()

  const data = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const paramsObject: Record<string, string> = {}
    params.forEach((key, value) => {
      paramsObject[value] = key
    })
    return { params, paramsObject }
  }, [location.search])

  return (
    <Tabs
      animated={false}
      {...tabsProps}
      onChange={(value) => {
        history.replace(addUrlParameters(location.pathname, { ...data.paramsObject, [paramName]: value }))
        if (tabsProps.onChange) {
          tabsProps.onChange(value)
        }
      }}
      defaultActiveKey={data.params.get(paramName) || tabsProps.defaultActiveKey}
    >
      {children}
    </Tabs>
  )
}
