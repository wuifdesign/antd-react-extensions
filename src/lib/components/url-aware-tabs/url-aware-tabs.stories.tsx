import React, { PropsWithChildren, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { UrlAwareTabs, UrlAwareTabsProps } from './url-aware-tabs'
import { Tabs } from 'antd'
import { Router } from 'react-router'
import { createHashHistory } from 'history'

export default {
  component: UrlAwareTabs,
  title: 'Components/Url Aware Tabs'
} as Meta

const Template: Story<Partial<PropsWithChildren<UrlAwareTabsProps>>> = (args) => {
  const history = createHashHistory()
  const [path, setPath] = useState<string | null>('/')

  history.listen((location) => {
    setPath(location.pathname + location.search)
  })

  return (
    <Router history={history}>
      <b>Current Path:</b> {path}
      <UrlAwareTabs {...args}>
        <Tabs.TabPane tab="Tab 1" key="1">
          Content of Tab 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </Tabs.TabPane>
      </UrlAwareTabs>
    </Router>
  )
}

export const Base = Template.bind({})
Base.args = {}
