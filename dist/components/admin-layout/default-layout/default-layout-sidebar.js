import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Drawer, Layout, Menu } from 'antd';
import { matchPath } from 'react-router-dom';
import useIsMobile from '../../../lib/hooks/use-is-mobile';
import { isMenuItemType } from '../menu-element.type';
import { DefaultLayoutContext } from './default-layout-context';
import useReactRouter from '../../../lib/hooks/use-react-router';
import { RouterHistory } from '../../../lib';
const {
  Sider
} = Layout;
const {
  SubMenu
} = Menu;
export const SIDEBAR_WIDTH = 230;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

const getActiveKeys = (pathname, menuPart) => {
  let defaultSelectedKeys = [];
  menuPart.forEach(item => {
    if ('type' in item && item.activeBy) {
      item.activeBy.forEach(url => {
        const matchBy = matchPath(pathname, {
          path: url
        });

        if (matchBy && item.key) {
          defaultSelectedKeys.push(item.key);
        }
      });
    } else if (!('type' in item) && item.url) {
      const match = matchPath(pathname, {
        path: item.url,
        exact: !!item.exact
      });

      if (match && item.key) {
        defaultSelectedKeys.push(item.key);
      }
    }

    if ('type' in item && item.elements) {
      defaultSelectedKeys = defaultSelectedKeys.concat(getActiveKeys(pathname, item.elements));
    }
  });
  return defaultSelectedKeys;
};

const enhanceMenu = (menuPart, prefix = '') => {
  Object.keys(menuPart).forEach(index => {
    const item = menuPart[parseInt(index, 10)];
    item.key = prefix + index;

    if ('type' in item && item.elements) {
      if (!item.activeBy) {
        item.activeBy = item.elements.filter(isMenuItemType).map(a => 'url' in a ? a.url : '');
      }

      enhanceMenu(item.elements, `${prefix + index}_`);
    }
  });
  return menuPart;
};

const renderMenu = item => {
  if ('type' in item) {
    if (!item.elements) {
      return null;
    }

    if (item.type === 'group') {
      return /*#__PURE__*/React.createElement(Menu.ItemGroup, {
        key: item.key,
        title: item.title
      }, item.elements.map(renderMenu));
    }

    return /*#__PURE__*/React.createElement(SubMenu, {
      key: item.key,
      icon: item.icon,
      title: item.title
    }, item.elements.map(renderMenu));
  }

  return /*#__PURE__*/React.createElement(Menu.Item, {
    onClick: () => RouterHistory.getHistory().push(item.url),
    key: item.key,
    icon: item.icon
  }, item.title);
};

const DefaultLayoutSidebar = ({
  logo,
  logoCollapsed,
  menu,
  sidebarBottom,
  menuAppend,
  sidebarTheme,
  sidebarWidth,
  sidebarCollapsedWidth,
  menuPrepend
}) => {
  const {
    location
  } = useReactRouter();
  const isMobile = useIsMobile();
  const {
    mobileNavOpen,
    setMobileNavOpen,
    sidebarCollapsed
  } = useContext(DefaultLayoutContext);
  const menuWithKeys = useMemo(() => enhanceMenu(menu), [menu]);
  const [selectedKeys, setSelectedKeys] = useState(getActiveKeys(location.pathname, menuWithKeys));
  const [openKeys, setOpenKeys] = useState(getActiveKeys(location.pathname, menuWithKeys));
  const latestMobileNavOpen = useRef(mobileNavOpen);
  const hideNav = useCallback(() => {
    if (latestMobileNavOpen) {
      setMobileNavOpen(false);
    }
  }, [latestMobileNavOpen, setMobileNavOpen]);
  useEffect(() => {
    const activeKeys = getActiveKeys(location.pathname, menuWithKeys);
    setSelectedKeys(activeKeys);
    setOpenKeys(keys => [...Array.from(new Set([...keys].concat(activeKeys)))]);
    hideNav();
  }, [location, hideNav, menuWithKeys]);
  useEffect(() => {
    latestMobileNavOpen.current = mobileNavOpen;
  });
  const onOpenChange = useCallback(keys => {
    setOpenKeys(keys);
  }, []);
  const SiderWithMenu = /*#__PURE__*/React.createElement(Sider, {
    collapsed: sidebarCollapsed,
    collapsedWidth: sidebarCollapsedWidth,
    width: sidebarWidth,
    style: {
      overflow: 'auto',
      height: '100vh',
      position: isMobile ? 'absolute' : 'fixed',
      left: 0,
      top: 0,
      zIndex: 200
    },
    theme: sidebarTheme
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, sidebarCollapsed ? logoCollapsed : logo), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, menuPrepend, /*#__PURE__*/React.createElement(Menu, {
    mode: "inline",
    selectedKeys: selectedKeys,
    openKeys: openKeys,
    onOpenChange: onOpenChange,
    style: {
      background: 'transparent',
      borderRightColor: 'transparent'
    },
    theme: sidebarTheme
  }, menuWithKeys.map(renderMenu)), menuAppend), sidebarBottom && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bottom"
  }, sidebarBottom)));

  if (isMobile) {
    return /*#__PURE__*/React.createElement(Drawer, {
      maskClosable: true,
      closable: false,
      onClose: hideNav,
      visible: mobileNavOpen,
      placement: "left",
      width: sidebarWidth,
      style: {
        padding: 0,
        height: '100vh'
      }
    }, SiderWithMenu);
  }

  return SiderWithMenu;
};

export default DefaultLayoutSidebar;