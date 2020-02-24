import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Drawer, Layout, Menu } from 'antd'
import { matchPath } from 'react-router-dom'
import useIsMobile from '../../../lib/hooks/use-is-mobile'
import { EnhancedMenuElement, isMenuItemType, MenuElement } from '../menu-element.type'
import { DefaultLayoutContext } from './default-layout-context'
import useReactRouter from '../../../lib/hooks/use-react-router'
import { RouterHistory } from '../../../lib'

const { Sider } = Layout
const { SubMenu } = Menu

export const SIDEBAR_WIDTH = 230
export const SIDEBAR_COLLAPSED_WIDTH = 80

const getActiveKeys = (pathname: string, menuPart: EnhancedMenuElement[]) => {
  let defaultSelectedKeys: string[] = []
  menuPart.forEach((item) => {
    if ('type' in item && item.activeBy) {
      item.activeBy.forEach((url) => {
        const matchBy = matchPath(pathname, { path: url })
        if (matchBy && item.key) {
          defaultSelectedKeys.push(item.key)
        }
      })
    } else if (!('type' in item) && item.url) {
      const match = matchPath(pathname, { path: item.url, exact: !!item.exact })
      if (match && item.key) {
        defaultSelectedKeys.push(item.key)
      }
    }
    if ('type' in item && item.elements) {
      defaultSelectedKeys = defaultSelectedKeys.concat(getActiveKeys(pathname, item.elements))
    }
  })
  return defaultSelectedKeys
}

const enhanceMenu = (menuPart: MenuElement[], prefix: string = ''): EnhancedMenuElement[] => {
  Object.keys(menuPart).forEach((index) => {
    const item = menuPart[parseInt(index, 10)] as EnhancedMenuElement
    item.key = prefix + index
    if ('type' in item && item.elements) {
      if (!item.activeBy) {
        item.activeBy = item.elements.filter(isMenuItemType).map((a) => ('url' in a ? a.url : ''))
      }
      enhanceMenu(item.elements, `${prefix + index}_`)
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
    <Menu.Item onClick={() => RouterHistory.getHistory().push(item.url)} key={item.key} icon={item.icon}>
      {item.title}
    </Menu.Item>
  )
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
  const { location } = useReactRouter()
  const isMobile = useIsMobile()
  const { mobileNavOpen, setMobileNavOpen, sidebarCollapsed } = useContext(DefaultLayoutContext)

  const menuWithKeys = useMemo(() => enhanceMenu(menu), [menu])

  const [selectedKeys, setSelectedKeys] = useState(getActiveKeys(location.pathname, menuWithKeys))
  const [openKeys, setOpenKeys] = useState(getActiveKeys(location.pathname, menuWithKeys))
  const latestMobileNavOpen = useRef<boolean>(mobileNavOpen)

  const hideNav = useCallback(() => {
    if (latestMobileNavOpen) {
      setMobileNavOpen(false)
    }
  }, [latestMobileNavOpen, setMobileNavOpen])

  useEffect(() => {
    const activeKeys = getActiveKeys(location.pathname, menuWithKeys)
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
      collapsed={sidebarCollapsed}
      collapsedWidth={sidebarCollapsedWidth}
      width={sidebarWidth}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: isMobile ? 'absolute' : 'fixed',
        left: 0,
        top: 0,
        zIndex: 200
      }}
      theme={sidebarTheme}
    >
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo-container">{sidebarCollapsed ? logoCollapsed : logo}</div>
        <div style={{ flex: 1 }}>
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
