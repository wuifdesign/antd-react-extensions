import React from 'react'
import { Meta } from '@storybook/react'
import AdminLayout from './admin-layout'
import { DashboardOutlined as IconDashboard, LockOutlined, UserOutlined } from '@ant-design/icons'
import { RouteElement } from './route-element.type'
import { PageContent } from '../page-content'
import { Button } from '../button'
import { ErrorPage } from '../error-page'
import { MenuElement } from './menu-element.type'
import { Checkbox, Col, Form, Input, Menu, Row } from 'antd'
import AuthLayout from './auth-layout/auth-layout'
import DefaultLayout from './default-layout/default-layout'
import BlankLayout from './blank-layout/blank-layout'

export default {
  component: AdminLayout,
  subcomponents: { AuthLayout, DefaultLayout, BlankLayout },
  title: 'Components/Admin Layout',
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const routes: RouteElement[] = [
  {
    path: '/',
    layout: 'default',
    breadcrumb: 'Dashboard',
    component: () => (
      <PageContent>
        <PageContent.Header
          title="Dashboard"
          icon={<IconDashboard />}
          extra={<Button type="primary">Add Something</Button>}
        />
        Dashboard
      </PageContent>
    ),
    exact: true
  },
  {
    path: '/auth',
    layout: 'auth',
    component: () => (
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Row>
            <Col flex={1}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
            </Col>
          </Row>
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Log In
        </Button>

        <Button type="link" block style={{ marginTop: 10 }}>
          Register Now
        </Button>
      </Form>
    ),
    exact: true
  },
  {
    path: '/blank',
    layout: 'blank',
    component: () => <>Blank</>,
    exact: true
  },
  {
    path: '*',
    layout: 'default',
    component: () => <ErrorPage type={404} />,
    breadcrumb: '404',
    is404: true
  }
]

const menu: MenuElement[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    url: '/',
    exact: true
  },
  {
    title: 'Auth',
    url: '/auth',
    exact: true
  },
  {
    title: 'Blank',
    url: '/blank',
    exact: true
  },
  {
    title: 'Demo Submenu',
    type: 'submenu',
    elements: [
      {
        title: 'Submenu Item',
        url: '/sub-item'
      }
    ]
  },
  {
    title: 'Demo Group',
    type: 'group',
    elements: [
      {
        title: 'Page Not Found',
        url: '/404'
      }
    ]
  }
]

export const Base = () => {
  return (
    <div style={{ transform: 'translateZ(0)' }}>
      <AdminLayout
        useHashRouter
        routes={routes}
        defaultLayoutProps={{
          menu,
          logo: 'AdminLogo',
          logoMobile: 'MAdminLogo',
          logoCollapsed: 'AL',
          sidebarMenuPrepend: (
            <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>BeforeMenu</div>
          ),
          sidebarMenuPrependCollapsed: (
            <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>BM</div>
          ),
          sidebarMenuAppend: <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>AfterMenu</div>,
          sidebarMenuAppendCollapsed: (
            <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>AM</div>
          ),
          headerRight: (
            <>
              <Menu mode="horizontal">
                <Menu.Item key="1">Menu 1</Menu.Item>
                <Menu.Item key="2">Menu 2</Menu.Item>
                <Menu.SubMenu title="Submenu 1" key="submenu">
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="item:1">Option 1</Menu.Item>
                    <Menu.Item key="item:2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="item:3">Option 3</Menu.Item>
                    <Menu.Item key="item:4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu>
            </>
          ),
          sidebarBottom: 'Version: 1.0'
        }}
        authLayoutProps={{
          logo: 'AdminLogo'
        }}
      />
    </div>
  )
}
