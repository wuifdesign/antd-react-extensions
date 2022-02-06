import React, { useEffect } from 'react'
import { Meta, Story } from '@storybook/react'
import { AdminLayout } from './admin-layout'
import {
  DashboardOutlined as IconDashboard,
  GlobalOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import { PageContent } from '../page-content'
import { Button } from '../button'
import { ErrorPage } from '../error-page'
import { MenuElement } from './menu-element.type'
import { Avatar, Checkbox, Col, Dropdown, Form, Input, Menu, Row, Table } from 'antd'
import { AuthLayout } from './layouts/auth-layout/auth-layout'
import { DefaultLayout } from './layouts/default-layout/default-layout'
import { BlankLayout } from './layouts/blank-layout/blank-layout'
import { NotificationsPopover } from '../notifications-popover'
import { Link } from 'react-router-dom'
import { SiderTheme } from 'antd/es/layout/Sider'
import { ConfigProvider } from '../config-provider'
import { EnhancedRouteType } from '../enhanced-routes'
import { LoadingSpinner } from '../loading-spinner'
import { useLayoutContext } from './layout-context'

export default {
  component: AdminLayout,
  subcomponents: { AuthLayout, DefaultLayout, BlankLayout },
  title: 'Components/Admin Layout',
  parameters: {
    layout: 'fullscreen'
  }
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
    title: 'Auth',
    icon: <IconDashboard />,
    url: '/auth',
    end: true
  },
  {
    title: 'Allowed',
    icon: <LockOutlined />,
    url: '/allowed',
    end: true
  },
  {
    title: 'Restricted',
    icon: <LockOutlined />,
    url: '/restricted',
    end: true
  },
  {
    title: 'Restricted without Layout',
    icon: <LockOutlined />,
    url: '/restricted-without-layout',
    end: true
  },
  {
    title: 'Restricted Loading',
    icon: <LockOutlined />,
    url: '/restricted-loading',
    end: true
  },
  {
    title: 'Blank',
    url: '/blank',
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

const Dashboard: React.FC = () => {
  const { fullPageLoading, setFullPageLoading } = useLayoutContext()

  useEffect(() => {
    if (fullPageLoading) {
      setTimeout(() => setFullPageLoading(false), 2000)
    }
  }, [fullPageLoading, setFullPageLoading])

  return (
    <PageContent hideBreadcrumbs>
      <PageContent.Header
        title="Dashboard"
        icon={<IconDashboard />}
        extra={<Button type="primary">Add Something</Button>}
      />
      <PageContent.Element>Dashboard</PageContent.Element>
      <PageContent.Element
        collapsable
        title="My Title"
        subTitle="My SubTitle"
        extra={<Button type="primary">Add Something</Button>}
      >
        Dashboard
      </PageContent.Element>
      <PageContent.Element
        title="My Title"
        subTitle="My SubTitle"
        extra={<Button type="primary">Add Something</Button>}
        removeBodyPadding
      >
        Dashboard
      </PageContent.Element>
      <Button onClick={() => setFullPageLoading('Loading Tip')}>FullPageLoading With Tip</Button>
      <Button onClick={() => setFullPageLoading(true)}>FullPageLoading</Button>
    </PageContent>
  )
}

const SubPage: React.FC = () => {
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
      <PageContent.Header
        title="SubPage"
        icon={<IconDashboard />}
        extra={<Button type="primary">Add Something</Button>}
      />
      <PageContent.Element removeBodyPadding>
        <Table size="small" columns={columns} dataSource={data} />
      </PageContent.Element>
      <PageContent.Element
        title="My Title"
        subTitle="My SubTitle"
        extra={<Button type="primary">Add Something</Button>}
      >
        Dashboard
      </PageContent.Element>
    </PageContent>
  )
}

const Restricted: React.FC = () => {
  return (
    <PageContent>
      <PageContent.Header title="Restricted" />
      {console.log('restricted')}
    </PageContent>
  )
}

const Guard: React.FC<{ allowed: boolean | undefined }> = ({ allowed, children }) => {
  if (allowed === undefined) {
    return <LoadingSpinner />
  }
  if (!allowed) {
    return (
      <ErrorPage
        type={403}
        extra={
          <Link to="/">
            <Button>Go Back</Button>
          </Link>
        }
      />
    )
  }
  return <>{children}</>
}

const routes: EnhancedRouteType[] = [
  {
    path: '/',
    breadcrumb: 'Dashboard',
    element: <Dashboard />
  },
  {
    path: '/sub-page',
    layout: 'default',
    breadcrumb: 'Sub Page',
    element: <SubPage />,
    guard: <Guard allowed={true} />
  },
  {
    path: '/allowed',
    layout: 'default',
    breadcrumb: 'Allowed',
    element: <SubPage />,
    guard: <Guard allowed={true} />,
    guardWithLayout: false
  },
  {
    path: '/restricted',
    layout: 'default',
    breadcrumb: 'Restricted',
    element: <Restricted />,
    guard: <Guard allowed={false} />
  },
  {
    path: '/restricted-without-layout',
    layout: 'default',
    breadcrumb: 'Restricted',
    element: <Restricted />,
    guard: <Guard allowed={false} />,
    guardWithLayout: false
  },
  {
    path: '/restricted-loading',
    layout: 'default',
    breadcrumb: 'Restricted Loading',
    element: <Restricted />,
    guard: <Guard allowed={undefined} />
  },
  {
    path: '/auth',
    layout: 'auth',
    element: <>Auth Layout</>
  },
  {
    path: '/blank',
    layout: 'blank',
    element: <>Blank</>
  },
  {
    path: '*',
    layout: 'default',
    element: <ErrorPage type={404} />,
    breadcrumb: '404',
    is404: true
  }
]

const Template: Story<{ siderTheme?: SiderTheme }> = ({ siderTheme }) => {
  return (
    <div style={{ transform: 'translateZ(0)' }}>
      <ConfigProvider>
        <AdminLayout
          routes={routes}
          copyright="Copyright © 2021 ..."
          defaultLayoutProps={{
            menu,
            logo: (type) => (type !== 'collapsed' ? 'AdminLogo' : 'AL'),
            sidebarTheme: siderTheme,
            sidebarMenuPrepend: (collapsed) => (
              <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>
                {!collapsed ? 'BeforeMenu' : 'BM'}
              </div>
            ),
            sidebarMenuAppend: (collapsed) => (
              <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>
                <a href="/">{!collapsed ? 'AfterMenu' : 'AM'}</a>
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
                  <Button type="text" style={{ textAlign: collapsed ? 'center' : undefined }}>
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
      </ConfigProvider>
    </div>
  )
}

export const Base = Template.bind({})
Base.args = {}

export const DarkMenu = Template.bind({})
DarkMenu.args = {
  siderTheme: 'dark'
}

const authRoutes: EnhancedRouteType[] = [
  {
    index: true,
    layout: 'auth',
    element: (
      <>
        <Form initialValues={{ remember: true }}>
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
      </>
    )
  }
]

export const Auth = () => {
  return (
    <div style={{ transform: 'translateZ(0)' }}>
      <AdminLayout
        copyright="Copyright © 2021 ..."
        routes={authRoutes}
        authLayoutProps={{
          logo: 'AdminLogo'
        }}
      />
    </div>
  )
}
