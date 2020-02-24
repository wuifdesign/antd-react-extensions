import React from 'react';
import { DashboardOutlined as IconDashboard } from '@ant-design/icons';
import { Button } from 'antd';
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
      path: '/demo',
      breadcrumb: 'Demo',
      component: () => (
        <PageContent>
          <PageContent.Header title="Demo"/>
          Demo
        </PageContent>
      ),
      exact: true,
    },
    {
      path: '*',
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
      name: 'Demo',
      elements: [
        {
          name: 'Demo Main',
          url: '/demo',
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
      sideBarMenuAppend={<div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>AfterMenu</div>}
      sideBarMenuPrepend={<div style={{ textAlign: 'center', margin: 15, border: '1px solid #eee' }}>BeforeMenu</div>}
      logo={'AdminLogo'}
      useHashRouter={true}
      routes={routes}
      menu={menu}
      sidebarBottom="Version: 1.0"
    />
  );
};
