import React from 'react';
import { DashboardOutlined as IconDashboard, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import AdminLayout from './admin-layout';
import { RouteElement } from './route-element.type';
import { MenuElement } from './menu-element.type';
import PageContent from '../page-content/page-content';
import ErrorPage from '../error-page/error-page';

export default {
  title: 'Admin Layout',
  component: AdminLayout,
};

export const FullAdminLayout = () => {
  const routes: RouteElement[] = [
    {
      path: '/',
      layout: 'default',
      breadcrumb: 'Dashboard',
      component: () => (
        <PageContent>
          <PageContent.Header
            title="Dashboard"
            icon={<IconDashboard/>}
            extra={<Button type="primary">Add Something</Button>}
          />
          Dashboard
        </PageContent>
      ),
      exact: true,
    },
    {
      path: '/blank',
      breadcrumb: 'Blank',
      layout: 'blank',
      component: () => (
        <>
          Blank
        </>
      ),
      exact: true,
    },
    {
      path: '*',
      layout: 'default',
      component: () => <ErrorPage type={404}/>,
      breadcrumb: '404',
      is404: true,
    },
  ];

  const menu: MenuElement[] = [
    {
      name: 'Dashboard',
      icon: <IconDashboard/>,
      url: '/',
      exact: true,
    },
    {
      name: 'Blank',
      url: '/blank',
      exact: true,
    },
    {
      name: 'Demo',
      type: 'submenu',
      elements: [
        {
          name: 'Demo Main',
          url: '/demo',
        },
      ],
    },
    {
      name: 'Demo 2',
      icon: <IconDashboard/>,
      type: 'group',
      elements: [
        {
          name: 'Demo Main 2',
          url: '/demo2',
        },
      ],
    },
    {
      name: 'Page Not Found',
      url: '/404',
    },
  ];

  return (
    <AdminLayout
      sidebarMenuAppend={<div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>AfterMenu</div>}
      sidebarMenuPrepend={<div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>BeforeMenu</div>}
      logo={'AdminLogo'}
      useHashRouter={true}
      routes={routes}
      menu={menu}
      sidebarBottom="Version: 1.0"
    />
  );
};

export const AuthAdminLayout = () => {
  const routes: RouteElement[] = [
    {
      path: '/',
      layout: 'auth',
      breadcrumb: 'Auth',
      component: () => (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
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
      exact: true,
    },
  ];

  return (
    <AdminLayout
      sidebarMenuAppend={<div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>AfterMenu</div>}
      sidebarMenuPrepend={<div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>BeforeMenu</div>}
      logo={'AdminLogo'}
      useHashRouter={true}
      routes={routes}
      menu={[]}
      sidebarBottom="Version: 1.0"
    />
  );
};

export const BlankAdminLayout = () => {
  const routes: RouteElement[] = [
    {
      path: '/',
      breadcrumb: 'Blank',
      layout: 'blank',
      component: () => (
        <>Blank Layout</>
      ),
      exact: true,
    },
  ];

  return (
    <AdminLayout
      logo={'AdminLogo'}
      useHashRouter={true}
      routes={routes}
      menu={[]}
    />
  );
};
