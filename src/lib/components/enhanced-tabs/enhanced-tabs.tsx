import React from 'react'
import { Tabs, TabsProps } from 'antd'
import { getKeyFromChildComponents } from '../..'
import { EnhancedTabPane, EnhancedTabPaneProps } from './enhanced-tab-pane'
import { useRouter } from 'next/router'

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
  const { pathname, query, replace } = useRouter() || { pathname: '/', replace: () => null, query: {} }

  if (useUrlState) {
    activeKey = activeKey || (query[urlParamName] as string) || tabsProps.defaultActiveKey || childKeys[0]

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
          replace({
            pathname,
            query: {
              ...query,
              [urlParamName]: value
            }
          })
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
