import React from 'react'
import { Tabs, TabsProps } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { getKeyFromChildComponents } from '../..'
import { EnhancedTabPane, EnhancedTabPaneProps } from './enhanced-tab-pane'

export type EnhancedTabsProps = TabsProps & {
  useUrlState?: boolean
  urlParamName?: string
}

export type ChildComponents = {
  TabPane: React.FC<EnhancedTabPaneProps>
}

/**
 * Antd Tabs but saving current active tab as url parameter.
 */
const EnhancedTabs: React.FC<EnhancedTabsProps> & ChildComponents = ({
  useUrlState = true,
  urlParamName = 'tab',
  activeKey,
  children,
  ...tabsProps
}) => {
  const childKeys = getKeyFromChildComponents(children)
  const [searchParams, setSearchParams] = useSearchParams()

  if (useUrlState) {
    activeKey = activeKey || searchParams.get(urlParamName) || tabsProps.defaultActiveKey || childKeys[0]

    if (!childKeys.includes(activeKey)) {
      activeKey = childKeys[0]
    }
  }

  return (
    <Tabs
      animated={false}
      {...tabsProps}
      onChange={(value) => {
        if (useUrlState) {
          searchParams.set(urlParamName, value)
          setSearchParams(searchParams, { replace: true })
        }
        tabsProps.onChange?.(value)
      }}
      activeKey={activeKey}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <>
              {React.cloneElement(child, {
                tab: (
                  <>
                    {child.props.icon ? <span className="enhanced-tab-icon">{child.props.icon}</span> : null}
                    {child.props.tab}
                  </>
                )
              })}
            </>
          )
        }
        return child
      })}
    </Tabs>
  )
}

EnhancedTabs.TabPane = EnhancedTabPane

export { EnhancedTabs }
