import React from 'react'
import { Meta, Story } from '@storybook/react'
import { DynamicRoutes } from './dynamic-routes'
import { ConfigProvider } from '../config-provider'
import { HashRouter, Link, useRouteMatch } from 'react-router-dom'
import { RouterPageType } from './router-page.type'
import Breadcrumbs from '../breadcrumbs/breadcrumbs'
import { LayoutContext } from '../admin-layout/layout-context'
import { RouteElementType } from './route-element.type'

export default {
  component: DynamicRoutes,
  title: 'Components/Dynamic Routes'
} as Meta

const Topics: React.FC<RouterPageType> = (props) => {
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

      {props.routes && <DynamicRoutes routes={props.routes} />}
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
    component: Topics,
    routes: [
      {
        path: '/topics',
        breadcrumb: null,
        component: () => (
          <>
            <Breadcrumbs />
            Topics Overview
          </>
        ),
        exact: true
      },
      {
        path: '/topics/detail',
        breadcrumb: 'Detail',
        component: () => (
          <>
            <Breadcrumbs />
            Topics Detail
          </>
        ),
        exact: true
      }
    ]
  }
]

const Template: Story = () => (
  <ConfigProvider>
    <LayoutContext.Provider
      value={{
        routes,
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

        <DynamicRoutes routes={routes} />
      </HashRouter>
    </LayoutContext.Provider>
  </ConfigProvider>
)

export const Default = Template.bind({})
Default.args = {}
