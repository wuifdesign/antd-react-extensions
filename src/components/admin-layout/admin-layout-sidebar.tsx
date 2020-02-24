import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Drawer, Layout, Menu } from 'antd';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import useIsMobile from '../../lib/hooks/use-is-mobile';
import { MenuElement } from './menu-element.type';
import { AdminLayoutContext } from './admin-layout-context';

const { Sider } = Layout;
const { SubMenu } = Menu;

export const SIDEBAR_WIDTH = 230;

const getActiveKeys = (pathname: string, menuPart: MenuElement[]) => {
  let defaultSelectedKeys: string[] = [];
  menuPart.forEach((item) => {
    if (item.activeBy) {
      item.activeBy.forEach((url) => {
        const matchBy = matchPath(pathname, {
          path: url,
          exact: !!item.exact,
        });
        if (matchBy && item.key) {
          defaultSelectedKeys.push(item.key);
        }
      });
    } else if (item.url) {
      const match = matchPath(pathname, {
        path: item.url,
        exact: !!item.exact,
      });
      if (match && item.key) {
        defaultSelectedKeys.push(item.key);
      }
    }
    if (item.elements) {
      defaultSelectedKeys = defaultSelectedKeys.concat(getActiveKeys(pathname, item.elements));
    }
  });
  return defaultSelectedKeys;
};

const addKeys = (menuPart: MenuElement[], prefix: string = '') => {
  Object.keys(menuPart).forEach((index) => {
    const item = menuPart[parseInt(index, 10)];
    item.key = prefix + index;
    if (item.elements) {
      addKeys(item.elements, `${prefix + index}_`);
    }
  });
  return menuPart;
};

const renderMenu = (item: MenuElement) => {
  if (item.elements) {
    return (
      <SubMenu
        key={item.key}
        title={(
          <span>
            {item.icon && item.icon}
            {item.name}
          </span>
        )}
      >
        {item.elements.map(renderMenu)}
      </SubMenu>
    );
  }
  return (
    <Menu.Item key={item.key}>
      {item.icon && item.icon}
      {item.name}
      {item.url && <NavLink to={item.url}/>}
    </Menu.Item>
  );
};

export type AdminLayoutSidebarProps = {
  menu: MenuElement[]
  logo: React.ReactNode | string
  sidebarBottom?: React.ReactNode | string
  sidebarWidth?: number
  menuPrepend?: React.ReactNode | string
  menuAppend?: React.ReactNode | string
};

const AdminLayoutSidebar: React.FC<AdminLayoutSidebarProps> = (
  {
    logo,
    menu,
    sidebarBottom,
    menuAppend,
    menuPrepend,
  },
) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { mobileNavOpen, setMobileNavOpen } = useContext(AdminLayoutContext);

  const menuWithKeys = useMemo(() => addKeys(menu), [menu]);

  const [selectedKeys, setSelectedKeys] = useState(getActiveKeys(location.pathname, menuWithKeys));
  const [openKeys, setOpenKeys] = useState(getActiveKeys(location.pathname, menuWithKeys));
  const latestMobileNavOpen = useRef<boolean>(mobileNavOpen);

  const hideNav = useCallback(() => {
    if (latestMobileNavOpen) {
      setMobileNavOpen(false);
    }
  }, [latestMobileNavOpen, setMobileNavOpen]);

  useEffect(() => {
    const activeKeys = getActiveKeys(location.pathname, menuWithKeys);
    setSelectedKeys(activeKeys);
    setOpenKeys((keys) => [...Array.from(new Set([...keys].concat(activeKeys)))]);
    hideNav();
  }, [location, hideNav, menuWithKeys]);

  useEffect(() => {
    latestMobileNavOpen.current = mobileNavOpen;
  });

  const onOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys);
  }, []);

  const SiderWithMenu = (
    <Sider
      width={SIDEBAR_WIDTH}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: isMobile ? 'absolute' : 'fixed',
        left: 0,
        top: 0,
        zIndex: 200,
      }}
      theme={'light'}
    >
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div
          className="logo-container"
          style={{
            height: 55,
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#fff',
            zIndex: 10000,
            boxShadow: '4px 4px 40px 0 rgba(0, 0, 0, .05)',
          }}
        >
          {logo}
        </div>
        <div style={{ flex: 1 }}>
          {menuPrepend}
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ background: 'transparent', borderRightColor: 'transparent' }}
          >
            {menuWithKeys.map(renderMenu)}
          </Menu>
          {menuAppend}
        </div>
        {
          sidebarBottom && (
            <div
              className="sidebar-bottom"
              style={{
                borderTop: '1px solid #eee',
                padding: 10,
                fontSize: 9,
                fontFamily: 'monospace',
                textAlign: 'center',
              }}
            >
              {sidebarBottom}
            </div>
          )
        }
      </div>
    </Sider>
  );

  if (isMobile) {
    return (
      <Drawer
        maskClosable
        closable={false}
        onClose={hideNav}
        visible={mobileNavOpen}
        placement="left"
        width={SIDEBAR_WIDTH}
        style={{ padding: 0, height: '100vh' }}
      >
        {SiderWithMenu}
      </Drawer>
    );
  }
  return SiderWithMenu;
};

export default AdminLayoutSidebar;
