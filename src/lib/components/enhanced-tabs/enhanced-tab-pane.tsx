import React from 'react'
import { TabPaneProps, Tabs } from 'antd'

export type EnhancedTabPaneProps = TabPaneProps & {
  icon?: React.ReactNode
}

/**
 * Antd Tabs but saving current active tab as url parameter.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EnhancedTabPane: React.FC<EnhancedTabPaneProps> = ({ icon, ...tabPaneProps }) => {
  return <Tabs.TabPane {...tabPaneProps} />
}
