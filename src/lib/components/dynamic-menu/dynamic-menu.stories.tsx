import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { DynamicMenu, DynamicMenuProps } from './dynamic-menu'
import { ConfigProvider } from '../config-provider'
import { MenuElement } from '../enhanced-layout'
import { DashboardOutlined as IconDashboard } from '@ant-design/icons/lib/icons'
import { LockOutlined } from '@ant-design/icons'

export default {
  component: DynamicMenu,
  title: 'Components/Dynamic Menu'
} as Meta

const menu: MenuElement[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    url: '/'
  },
  {
    title: 'Sub Page',
    icon: <IconDashboard />,
    url: '/sub-page'
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
    <div style={{ width: 300 }}>
      <DynamicMenu {...args} elements={menu} />
    </div>
  </ConfigProvider>
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  nextRouter: {
    pathname: '/sub-item',
    path: '/sub-item'
  }
}

export const Dark = Template.bind({})
Dark.args = {
  theme: 'dark'
}
