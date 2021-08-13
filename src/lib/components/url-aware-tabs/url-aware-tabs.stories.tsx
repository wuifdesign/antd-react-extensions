import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { UrlAwareTabs, UrlAwareTabsProps } from './url-aware-tabs'
import { Tabs } from 'antd'
import { Router } from 'react-router'
import { createHashHistory } from 'history'

export default {
  component: UrlAwareTabs,
  title: 'Components/Url Aware Tabs'
} as Meta

const history = createHashHistory()

const Template: Story<Partial<PropsWithChildren<UrlAwareTabsProps>>> = (args) => {
  const [path, setPath] = useState<string | null>('/')

  useEffect(() => {
    history.listen((location) => {
      setPath(location.pathname + location.search)
    })
    setPath(history.location.pathname + history.location.search)
  }, [])

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
