import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { UrlAwareTabs, UrlAwareTabsProps } from './url-aware-tabs'
import { Tabs } from 'antd'
import { HashRouter } from 'react-router-dom'

export default {
  component: UrlAwareTabs,
  title: 'Components/Url Aware Tabs'
} as Meta

const Template: Story<Partial<PropsWithChildren<UrlAwareTabsProps>>> = (args) => {
  return (
    <HashRouter>
      <b>Current Path:</b>
      <UrlAwareTabs {...args}>
        <Tabs.TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </Tabs.TabPane>
      </UrlAwareTabs>
    </HashRouter>
  )
}

export const Base = Template.bind({})
Base.args = {}
