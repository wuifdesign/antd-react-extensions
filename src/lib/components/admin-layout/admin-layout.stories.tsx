import React from 'react'
import { Meta } from '@storybook/react'
import AdminLayout from './admin-layout'
import { DashboardOutlined as IconDashboard, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { RouteElement } from './route-element.type'
import { PageContent } from '../page-content'
import { Button } from '../button'
import { ErrorPage } from '../error-page'
import { MenuElement } from './menu-element.type'
import { Checkbox, Col, Dropdown, Form, Input, Menu, Row } from 'antd'
import AuthLayout from './auth-layout/auth-layout'
import DefaultLayout from './default-layout/default-layout'
import BlankLayout from './blank-layout/blank-layout'
import { NotificationsPopover } from '../notifications-popover'

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
    title: 'Demo Submenu 2',
    type: 'submenu',
    elements: [
      {
        title: 'Submenu Item 2',
        url: '/sub-item2',
        isActive: () => true
      }
    ]
  },
  {
    title: 'Demo Submenu 3',
    type: 'submenu',
    isActive: () => true,
    elements: [
      {
        title: 'Submenu Item 2',
        url: '/sub-item3'
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
              <NotificationsPopover
                dot
                notificationListProps={{
                  maxHeight: 250,
                  dataSource: [
                    {
                      icon: <MailOutlined />,
                      title: 'Title 1',
                      description: 'This is description number 1',
                      onClick: () => console.log('item 1')
                    },
                    {
                      icon: <MailOutlined />,
                      title: 'Title 2',
                      description: 'This is description number 2',
                      onClick: () => console.log('item 2')
                    },
                    {
                      icon: <MailOutlined />,
                      title: 'Title 3',
                      description: 'This is description number 3',
                      onClick: () => console.log('item 3')
                    },
                    {
                      icon: <MailOutlined />,
                      title: 'Title 4',
                      description: 'This is description number 4',
                      onClick: () => console.log('item 4')
                    },
                    {
                      icon: <MailOutlined />,
                      title: 'Title 5',
                      description: 'This is description number 5',
                      onClick: () => console.log('item 5')
                    }
                  ]
                }}
              />
              <Dropdown
                key="languages"
                overlay={
                  <Menu>
                    {['de', 'en'].map((lang) => (
                      <Menu.Item key={`language-${lang}`}>{lang}</Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <Button type="text">de</Button>
              </Dropdown>
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
