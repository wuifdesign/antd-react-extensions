import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { DynamicMenu, DynamicMenuProps } from './dynamic-menu'
import { ConfigProvider } from '../config-provider'
import { MenuElement } from '../admin-layout'
import { DashboardOutlined as IconDashboard } from '@ant-design/icons/lib/icons'
import { LockOutlined } from '@ant-design/icons'
import { HashRouter } from 'react-router-dom'

export default {
  component: DynamicMenu,
  title: 'Components/Dynamic Menu'
} as Meta

const menu: MenuElement[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    url: '/',
    end: true
  },
  {
    title: 'Sub Page',
    icon: <IconDashboard />,
    url: '/sub-page',
    end: true
  },
  {
    title: 'Demo Submenu',
    type: 'submenu',
    elements: [
      {
        title: 'Submenu Item',
        icon: <LockOutlined />,
        url: '/sub-item'
      }
    ]
  }
]

const Template: Story<PropsWithChildren<DynamicMenuProps>> = (args) => (
  <ConfigProvider>
    <HashRouter>
      <div style={{ width: 300 }}>
        <DynamicMenu {...args} elements={menu} />
      </div>
    </HashRouter>
  </ConfigProvider>
)

export const Default = Template.bind({})
Default.args = {}

export const Dark = Template.bind({})
Dark.args = {
  theme: 'dark'
}
