function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Suspense, useState } from 'react';
import { Layout, Spin } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import ErrorBoundary from '../error-boundary/error-boundary';
import DefaultLayout from './default-layout/default-layout';
import AuthLayout from './auth-layout/auth-layout';
import BlankLayout from './blank-layout/blank-layout';
import RouterHistory from '../../lib/router-history';
import { LayoutContext } from './layout-context';

const RouteWithSubRoutes = route => /*#__PURE__*/React.createElement(Route, {
  path: route.path,
  exact: !!route.exact,
  render: props => /*#__PURE__*/React.createElement(route.layout, route.layoutProps, /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(Suspense, {
    fallback: /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(Spin, null))
  }, /*#__PURE__*/React.createElement(route.component, _extends({}, props, {
    routes: route.routes
  })))))
});

/**
 * Default Layout for the Admin Interface. Can be configured for specific needs.
 *
 * LazyLoad Routes:
 * `const DashboardPage = React.lazy(() => import(/* webpackChunkName: "dashboard" *\/'../dashboard.page'))`
 */
export const AdminLayout = ({
  routes,
  loading = false,
  useHashRouter = false,
  authLayoutProps,
  defaultLayoutProps
}) => {
  const [fullPageLoading, setFullPageLoading] = useState(false);
  RouterHistory.setHistoryByType(useHashRouter ? 'hash' : 'browser');

  if (loading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "page-loading"
    }, /*#__PURE__*/React.createElement(Spin, {
      size: "large",
      tip: "Loading..."
    }));
  }

  return /*#__PURE__*/React.createElement(LayoutContext.Provider, {
    value: {
      fullPageLoading,
      setFullPageLoading
    }
  }, /*#__PURE__*/React.createElement(Layout, {
    style: {
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Router, {
    history: RouterHistory.getHistory()
  }, /*#__PURE__*/React.createElement(Switch, null, routes.map((route, i) => {
    const layoutRoute = { ...route
    };

    if (route.layout === 'blank') {
      layoutRoute.layout = BlankLayout;
    }

    if (route.layout === 'auth') {
      layoutRoute.layout = AuthLayout;
      layoutRoute.layoutProps = { ...authLayoutProps,
        ...layoutRoute.layoutProps
      };
    }

    if (route.layout === 'default' || !route.layout) {
      layoutRoute.layout = DefaultLayout;
      layoutRoute.layoutProps = {
        routes: routes,
        ...defaultLayoutProps,
        ...layoutRoute.layoutProps
      };
    }

    if (typeof layoutRoute.layout === 'string') {
      throw new Error(`'Layout with name ${layoutRoute.layout} not supported!`);
    }

    return /*#__PURE__*/React.createElement(RouteWithSubRoutes, _extends({
      key: i
    }, layoutRoute));
  })))), fullPageLoading && /*#__PURE__*/React.createElement("div", {
    className: "loading-overlay"
  }, /*#__PURE__*/React.createElement(Spin, {
    size: "large"
  })));
};
export default AdminLayout;