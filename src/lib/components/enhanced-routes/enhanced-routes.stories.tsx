import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ConfigProvider } from '../config-provider'
import { HashRouter, Link, Outlet, useRoutes } from 'react-router-dom'
import { EnhancedRoute } from './enhanced-route'
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import { LayoutContext } from '../admin-layout/layout-context'
import { enhanceRoutes } from './enhance-routes'
import { EnhancedRouteType } from './enhanced-route.type'

export default {
  component: EnhancedRoute,
  title: 'Components/Enhanced Routes'
} as Meta

const Topics: React.FC = () => {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to="">Overview</Link>
        </li>
        <li>
          <Link to="detail">Detail</Link>
        </li>
        <li>
          <Link to="test">Test</Link>
        </li>
      </ul>

      <hr />

      <Outlet />
    </div>
  )
}

const Guard: React.FC = ({ children }) => {
  return <>{children}</>
}

const routes: EnhancedRouteType[] = [
  { path: '/', breadcrumb: 'Home', element: <>Home</> },
  {
    path: '/topics',
    breadcrumb: 'Topics',
    element: <Topics />,
    children: [
      {
        path: '',
        breadcrumb: 'Overview',
        guard: <Guard />,
        element: (
          <>
            <Breadcrumbs />
            Topics Overview
          </>
        )
      },
      {
        path: 'detail',
        breadcrumb: ({ pathname }) => 'Detail ' + pathname,
        element: (
          <>
            <Breadcrumbs />
            Topics Detail
          </>
        )
      }
    ]
  },
  {
    path: '/topics',
    breadcrumb: null,
    element: <Topics />,
    children: [
      {
        path: 'test',
        breadcrumb: 'Test',
        guard: <Guard />,
        element: (
          <>
            <Breadcrumbs />
            Topics Test
          </>
        )
      }
    ]
  }
]

const AppRoutes: React.FC = () => {
  const enhancedRoutes = enhanceRoutes(routes)
  return useRoutes(enhancedRoutes)
}

const Template: Story = () => {
  return (
    <ConfigProvider>
      <LayoutContext.Provider
        value={{
          routes,
          guardWithLayout: true,
          layoutType: null,
          setLayoutType: () => null,
          fullPageLoading: false,
          setFullPageLoading: () => null
        }}
      >
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

          <AppRoutes />
        </HashRouter>
      </LayoutContext.Provider>
    </ConfigProvider>
  )
}

export const Default = Template.bind({})
Default.args = {}
