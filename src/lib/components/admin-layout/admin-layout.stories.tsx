import React from 'react'
import { Meta } from '@storybook/react'
import { AdminLayout } from './admin-layout'
import {
  DashboardOutlined as IconDashboard,
  GlobalOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import { RouteElement } from './route-element.type'
import { PageContent } from '../page-content'
import { Button } from '../button'
import { ErrorPage } from '../error-page'
import { MenuElement } from './menu-element.type'
import { Avatar, Checkbox, Col, Dropdown, Form, Input, Menu, Row, Table } from 'antd'
import { AuthLayout } from './auth-layout/auth-layout'
import { DefaultLayout } from './default-layout/default-layout'
import { BlankLayout } from './blank-layout/blank-layout'
import { NotificationsPopover } from '../notifications-popover'
import { Link } from 'react-router-dom'
import { PageHeader } from '../page-header'
import { PageElement } from '../page-element'

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
        <PageHeader title="Dashboard" icon={<IconDashboard />} extra={<Button type="primary">Add Something</Button>} />
        <PageElement>Dashboard</PageElement>
        <PageElement title="My Title" subTitle="My SubTitle" extra={<Button type="primary">Add Something</Button>}>
          Dashboard
        </PageElement>
        <PageElement
          title="My Title"
          subTitle="My SubTitle"
          extra={<Button type="primary">Add Something</Button>}
          removeBodyPadding
        >
          Dashboard
        </PageElement>
      </PageContent>
    ),
    exact: true
  },
  {
    path: '/sub-page',
    layout: 'default',
    breadcrumb: 'Sub Page',
    component: () => {
      const data = [
        {
          key: '1',
          name: 'John Brown',
          status: 'success'
        },
        {
          key: '2',
          name: 'Jim Green',
          status: 'success'
        },
        {
          key: '3',
          name: 'Joe Black',
          status: 'success'
        },
        {
          key: '4',
          name: 'Jim Red',
          status: 'success'
        }
      ]

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Status',
          dataIndex: 'status'
        }
      ]

      return (
        <PageContent>
          <PageHeader title="SubPage" icon={<IconDashboard />} extra={<Button type="primary">Add Something</Button>} />
          <PageElement removeBodyPadding>
            <Table size="small" columns={columns} dataSource={data} />
          </PageElement>
          <PageElement title="My Title" subTitle="My SubTitle" extra={<Button type="primary">Add Something</Button>}>
            Dashboard
          </PageElement>
        </PageContent>
      )
    },
    exact: true
  },
  {
    path: '/restricted',
    layout: 'default',
    breadcrumb: 'Restricted',
    component: () => (
      <PageContent>
        <PageHeader title="Restricted" />
        {console.log('restricted')}
      </PageContent>
    ),
    canActivate: () => false,
    exact: true
  },
  {
    path: '/restricted-loading',
    layout: 'default',
    breadcrumb: 'Restricted Loading',
    component: () => (
      <PageContent>
        <PageHeader title="Restricted Loading" />
        {console.log('restricted')}
      </PageContent>
    ),
    canActivate: () => undefined,
    exact: true
  },
  {
    path: '/restricted-with-route-fallback',
    layout: 'default',
    breadcrumb: 'Restricted with Route Fallback',
    component: () => (
      <PageContent>
        <PageHeader title="Restricted with Route Fallback" />
        {console.log('restricted with route fallback')}
      </PageContent>
    ),
    canActivate: () => false,
    canActivateFallback: {
      renderLayout: true,
      component: 'My Custom Fallback without Layout'
    },
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
    title: 'Sub Page',
    icon: <IconDashboard />,
    url: '/sub-page',
    exact: true
  },
  {
    title: 'Restricted',
    icon: <LockOutlined />,
    url: '/restricted',
    exact: true
  },
  {
    title: 'Restricted Loading',
    icon: <LockOutlined />,
    url: '/restricted-loading',
    exact: true
  },
  {
    title: 'Restricted with Fallback',
    icon: <LockOutlined />,
    url: '/restricted-with-route-fallback',
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
        routes={routes}
        defaultLayoutProps={{
          menu,
          logo: (type) => (type !== 'collapsed' ? 'AdminLogo' : 'AL'),
          sidebarTheme: 'light',
          sidebarMenuPrepend: (collapsed) => (
            <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>
              {!collapsed ? 'BeforeMenu' : 'BM'}
            </div>
          ),
          sidebarMenuAppend: (collapsed) => (
            <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>
              {!collapsed ? 'AfterMenu' : 'AM'}
            </div>
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
          sidebarBottom: (collapsed) => (
            <div>
              <Dropdown
                trigger={['click']}
                overlayStyle={{ minWidth: 0, paddingLeft: 15 }}
                overlay={
                  <Menu>
                    <Menu.SubMenu title="Language" icon={<GlobalOutlined />} key="language">
                      {['en', 'de'].map((lang) => (
                        <Menu.Item
                          className={lang === 'de' ? 'active-language' : undefined}
                          key={`language-${lang}`}
                          onClick={() => console.log(lang)}
                        >
                          {lang}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                    <Menu.Item icon={<UserOutlined />} key="account">
                      <Link to="/account">Account</Link>
                    </Menu.Item>
                    <Menu.Item icon={<LogoutOutlined />} key="logout">
                      <Link to="/logout">Logout</Link>
                    </Menu.Item>
                  </Menu>
                }
              >
                <Button type="text">
                  <Avatar size="small" className="user-avatar" style={{ marginRight: collapsed ? 0 : 8 }}>
                    UN
                  </Avatar>
                  {!collapsed && <span style={{ verticalAlign: 'middle' }}>UserName</span>}
                </Button>
              </Dropdown>
            </div>
          )
        }}
      />
    </div>
  )
}

export const Auth = () => {
  return (
    <div style={{ transform: 'translateZ(0)' }}>
      <AdminLayout
        routes={[
          {
            path: '/',
            layout: 'auth',
            component: () => (
              <Form initialValues={{ remember: true }}>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
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
          }
        ]}
        authLayoutProps={{
          logo: 'AdminLogo'
        }}
      />
    </div>
  )
}
