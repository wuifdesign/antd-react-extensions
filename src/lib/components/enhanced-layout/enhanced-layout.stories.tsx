import React, { useEffect } from 'react'
import { Meta, Story } from '@storybook/react'
import { EnhancedLayout } from './enhanced-layout'
import {
  DashboardOutlined as IconDashboard,
  GlobalOutlined,
  LockOutlined,
  LogoutOutlined,
  MailOutlined,
  UserOutlined
} from '@ant-design/icons'
import { PageContent } from '../page-content'
import { EnhancedButton } from '../enhanced-button'
import { MenuElement } from '../dynamic-menu/menu-element.type'
import { Avatar, Checkbox, Col, Dropdown, Form, Input, Menu, Row, Space } from 'antd'
import { AuthLayout } from './layouts/auth-layout/auth-layout'
import { AdminLayout } from './layouts/admin-layout/admin-layout'
import { BlankLayout } from './layouts/blank-layout/blank-layout'
import { NotificationsPopover } from '../notifications-popover'
import { SiderTheme } from 'antd/es/layout/Sider'
import { ConfigProvider } from '../config-provider'
import { useLayoutContext } from './layout-context'

export default {
  component: EnhancedLayout,
  subcomponents: { AuthLayout, DefaultLayout: AdminLayout, BlankLayout },
  title: 'Components/Enhanced Layout',
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

const menu: MenuElement[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    url: '/'
  },
  {
    title: 'Posts',
    icon: <LockOutlined />,
    type: 'submenu',
    elements: [
      {
        title: 'All Posts',
        icon: <LockOutlined />,
        url: '/posts',
        isActive: ['/posts', '/posts/[id]']
      }
    ]
  },
  {
    title: 'Demo Group',
    type: 'group',
    elements: [
      {
        title: 'Profile',
        url: '/profile'
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
    <PageContent>
      <PageContent.Header
        title="Dashboard"
        icon={<IconDashboard />}
        extra={<EnhancedButton type="primary">Add Something</EnhancedButton>}
      />
      <PageContent.Element>
        Dashboard
        <div>
          <Space>
            <EnhancedButton onClick={() => setFullPageLoading('Loading Tip')}>FullPageLoading With Tip</EnhancedButton>
            <EnhancedButton onClick={() => setFullPageLoading(true)}>FullPageLoading</EnhancedButton>
          </Space>
        </div>
      </PageContent.Element>
    </PageContent>
  )
}

const Template: Story<{ siderTheme?: SiderTheme }> = ({ siderTheme }) => {
  return (
    <div style={{ transform: 'translateZ(0)' }}>
      <ConfigProvider>
        <EnhancedLayout errorBoundaryFallback="Error Fallback">
          <AdminLayout
            menu={menu}
            logo={(type) => (type !== 'collapsed' ? 'AdminLogo' : 'AL')}
            sidebarTheme={siderTheme}
            sidebarMenuPrepend={(collapsed) => (
              <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>
                {!collapsed ? 'BeforeMenu' : 'BM'}
              </div>
            )}
            sidebarMenuAppend={(collapsed) => (
              <div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>
                <a href="/">{!collapsed ? 'AfterMenu' : 'AM'}</a>
              </div>
            )}
            headerRight={
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
                  <EnhancedButton type="text">de</EnhancedButton>
                </Dropdown>
              </>
            }
            sidebarBottom={(collapsed) => (
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
                        <a href="/account">Account</a>
                      </Menu.Item>
                      <Menu.Item icon={<LogoutOutlined />} key="logout">
                        <a href="/logout">Logout</a>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <EnhancedButton type="text" style={{ textAlign: collapsed ? 'center' : undefined }}>
                    <Avatar size="small" className="user-avatar" style={{ marginRight: collapsed ? 0 : 8 }}>
                      UN
                    </Avatar>
                    {!collapsed && <span style={{ verticalAlign: 'middle' }}>UserName</span>}
                  </EnhancedButton>
                </Dropdown>
              </div>
            )}
          >
            <Dashboard />
          </AdminLayout>
        </EnhancedLayout>
      </ConfigProvider>
    </div>
  )
}

export const Base = Template.bind({})
Base.args = {}
Base.parameters = {
  nextRouter: {
    pathname: '/posts/[id]'
  }
}

export const DarkMenu = Template.bind({})
DarkMenu.args = {
  siderTheme: 'dark'
}

export const Auth = () => {
  return (
    <div style={{ transform: 'translateZ(0)' }}>
      <EnhancedLayout copyright="Copyright © 2021 ...">
        <AuthLayout logo="AuthLogo">
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

            <EnhancedButton type="primary" htmlType="submit" block>
              Log In
            </EnhancedButton>

            <EnhancedButton type="link" block style={{ marginTop: 10 }}>
              Register Now
            </EnhancedButton>
          </Form>
        </AuthLayout>
      </EnhancedLayout>
    </div>
  )
}
