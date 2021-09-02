import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Drawer, Layout, Menu } from 'antd'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useIsMobile } from '../../../utils/hooks/use-is-mobile'
import { EnhancedMenuElement, MenuElement } from '../menu-element.type'
import { useDefaultLayoutContext } from './default-layout-context'

const { Sider } = Layout
const { SubMenu } = Menu

export const SIDEBAR_WIDTH = 230
export const SIDEBAR_COLLAPSED_WIDTH = 80

const enhanceMenu = (menuPart: MenuElement[], prefix: string = ''): EnhancedMenuElement[] => {
  Object.keys(menuPart).forEach((index) => {
    const item = menuPart[parseInt(index, 10)] as EnhancedMenuElement
    item.key = prefix + index
    if ('type' in item && item.elements) {
      enhanceMenu(item.elements, `${item.key}_`)
    }
  })
  return menuPart as EnhancedMenuElement[]
}

const renderMenu = (item: EnhancedMenuElement) => {
  if ('type' in item) {
    if (!item.elements) {
      return null
    }
    if (item.type === 'group') {
      return (
        <Menu.ItemGroup key={item.key} title={item.title}>
          {item.elements.map(renderMenu)}
        </Menu.ItemGroup>
      )
    }
    return (
      <SubMenu key={item.key} icon={item.icon} title={item.title}>
        {item.elements.map(renderMenu)}
      </SubMenu>
    )
  }
  return (
    <Menu.Item key={item.key} icon={item.icon}>
      <Link to={item.url}>{item.title}</Link>
    </Menu.Item>
  )
}

const getActiveMenuKeys = (pathname: string, enhancedMenu: EnhancedMenuElement[]): string[] => {
  let activeKeys: string[] = []
  for (const item of enhancedMenu) {
    let isActive = false
    if ('type' in item && item.elements) {
      const subActiveKeys = getActiveMenuKeys(pathname, item.elements)
      if (subActiveKeys.length > 0) {
        isActive = true
      }
      activeKeys = [...activeKeys, ...subActiveKeys]
    } else if (!('type' in item) && item.url) {
      if (matchPath(pathname, { path: item.url, exact: !!item.exact })) {
        isActive = true
      }
    }
    if ('isActive' in item && !!item.isActive) {
      isActive = item.isActive(pathname)
    }
    if (isActive) {
      activeKeys.push(item.key)
    }
  }
  return activeKeys
}

export type AdminLayoutSidebarProps = {
  menu: MenuElement[]
  logo: React.ReactNode | string
  logoCollapsed?: React.ReactNode | string
  sidebarBottom?: React.ReactNode | string
  sidebarWidth?: number
  sidebarTheme?: 'light' | 'dark'
  sidebarCollapsedWidth?: number
  menuPrepend?: React.ReactNode | string
  menuAppend?: React.ReactNode | string
}

const DefaultLayoutSidebar: React.FC<AdminLayoutSidebarProps> = ({
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
  const location = useLocation()
  const isMobile = useIsMobile()
  const { mobileNavOpen, setMobileNavOpen, sidebarCollapsed } = useDefaultLayoutContext()

  const menuWithKeys = useMemo(() => enhanceMenu(menu), [menu])

  const [selectedKeys, setSelectedKeys] = useState(getActiveMenuKeys(location.pathname, menuWithKeys))
  const [openKeys, setOpenKeys] = useState(getActiveMenuKeys(location.pathname, menuWithKeys))
  const latestMobileNavOpen = useRef<boolean>(mobileNavOpen)

  const hideNav = useCallback(() => {
    if (latestMobileNavOpen) {
      setMobileNavOpen(false)
    }
  }, [latestMobileNavOpen, setMobileNavOpen])

  useEffect(() => {
    const activeKeys = getActiveMenuKeys(location.pathname, menuWithKeys)
    setSelectedKeys(activeKeys)
    setOpenKeys((keys) => [...Array.from(new Set([...keys].concat(activeKeys)))])
    hideNav()
  }, [location, hideNav, menuWithKeys])

  useEffect(() => {
    latestMobileNavOpen.current = mobileNavOpen
  })

  const onOpenChange = useCallback((keys: string[]) => {
    setOpenKeys(keys)
  }, [])

  const SiderWithMenu = (
    <Sider
      collapsed={!isMobile && sidebarCollapsed}
      collapsedWidth={sidebarCollapsedWidth}
      width={sidebarWidth}
      className="default-layout-sider"
      style={{ position: isMobile ? 'absolute' : 'fixed' }}
      theme={sidebarTheme}
    >
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="menu-container">
          <div className="logo-container">{sidebarCollapsed ? logoCollapsed : logo}</div>
          {menuPrepend}
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange as any}
            style={{ background: 'transparent', borderRightColor: 'transparent' }}
            theme={sidebarTheme}
          >
            {menuWithKeys.map(renderMenu)}
          </Menu>
          {menuAppend}
        </div>
        {sidebarBottom && <div className="sidebar-bottom">{sidebarBottom}</div>}
      </div>
    </Sider>
  )

  if (isMobile) {
    return (
      <Drawer
        maskClosable
        closable={false}
        onClose={hideNav}
        visible={mobileNavOpen}
        placement="left"
        width={sidebarWidth}
        style={{ padding: 0, height: '100vh' }}
      >
        {SiderWithMenu}
      </Drawer>
    )
  }
  return SiderWithMenu
}

export default DefaultLayoutSidebar
