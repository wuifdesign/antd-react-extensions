import React from 'react'
import { Meta, Story } from '@storybook/react'
import { DynamicRoutes } from './dynamic-routes'
import { ConfigProvider } from '../config-provider'
import { RouteElementType } from '../admin-layout'
import { HashRouter, Link, useRouteMatch } from 'react-router-dom'

export default {
  component: DynamicRoutes,
  title: 'Components/Dynamic Routes'
} as Meta

const subRoutes: RouteElementType[] = [
  {
    path: '/topics',
    breadcrumb: 'Detail',
    component: () => <>Topics Overview</>,
    exact: true
  },
  {
    path: '/topics/detail',
    breadcrumb: 'Detail',
    component: () => <>Topics Detail</>,
    exact: true
  }
]

const Topics: React.FC = () => {
  const { url } = useRouteMatch()

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${url}`}>Overview</Link>
        </li>
        <li>
          <Link to={`${url}/detail`}>Detail</Link>
        </li>
      </ul>

      <hr />

      <DynamicRoutes routes={subRoutes} />
    </div>
  )
}

const routes: RouteElementType[] = [
  {
    path: '/',
    breadcrumb: 'Home',
    component: () => <>Home</>,
    exact: true
  },
  {
    path: '/topics',
    breadcrumb: 'Topics',
    component: () => <Topics />
  }
]

const Template: Story = () => (
  <ConfigProvider>
    <HashRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <DynamicRoutes routes={routes} />
    </HashRouter>
  </ConfigProvider>
)

export const Default = Template.bind({})
Default.args = {}
