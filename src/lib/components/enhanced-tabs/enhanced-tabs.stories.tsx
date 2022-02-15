import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { EnhancedTabs, EnhancedTabsProps } from './enhanced-tabs'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

export default {
  component: EnhancedTabs,
  title: 'Components/Enhanced Tabs'
} as Meta

const Template: Story<Partial<PropsWithChildren<EnhancedTabsProps>>> = (args) => {
  return (
    <EnhancedTabs {...args}>
      <EnhancedTabs.TabPane icon={<UserOutlined />} tab="Tab 1" key="tab_1">
        Content of Tab 1
      </EnhancedTabs.TabPane>
      <EnhancedTabs.TabPane icon={<LockOutlined />} tab="Tab 2" key="tab_2">
        Content of Tab 2
      </EnhancedTabs.TabPane>
      <EnhancedTabs.TabPane icon={<LockOutlined />} tab="Tab 3" key="tab_3">
        Content of Tab 3
      </EnhancedTabs.TabPane>
      <EnhancedTabs.TabPane icon={<LockOutlined />} tab="Tab 4" key="tab_4">
        Content of Tab 4
      </EnhancedTabs.TabPane>
      <EnhancedTabs.TabPane icon={<LockOutlined />} tab="Tab 5" key="tab_5">
        Content of Tab 5
      </EnhancedTabs.TabPane>
    </EnhancedTabs>
  )
}

export const Base = Template.bind({})
Base.args = {}
Base.parameters = {
  nextRouter: {
    pathname: '/',
    query: { tab: 'tab_3' }
  }
}

export const UseDefaultKey = Template.bind({})
UseDefaultKey.args = {
  defaultActiveKey: 'tab_2'
}
