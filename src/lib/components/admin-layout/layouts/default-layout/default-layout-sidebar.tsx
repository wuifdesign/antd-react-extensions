import React, { useEffect } from 'react'
import { Drawer, Layout } from 'antd'
import { MenuElement } from '../../menu-element.type'
import { useDefaultLayoutContext } from './default-layout-context'
import { useIsMobile } from '../../../config-provider'
import { DynamicMenu } from '../../../dynamic-menu'
import { useLocation } from 'react-router-dom'
import { FCWithoutChildren } from '../../../../utils'

const { Sider } = Layout

export const SIDEBAR_WIDTH = 230
export const SIDEBAR_COLLAPSED_WIDTH = 80

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

const DefaultLayoutSidebar: FCWithoutChildren<AdminLayoutSidebarProps> = ({
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

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location, setMobileNavOpen])

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
        <div className="default-layout-menu-container">
          <div className="logo-container">{sidebarCollapsed ? logoCollapsed : logo}</div>
          {menuPrepend}
          <DynamicMenu
            style={{ background: 'transparent', borderRightColor: 'transparent' }}
            elements={menu}
            theme={sidebarTheme}
          />
          {menuAppend}
        </div>
        {sidebarBottom && <div className="default-sidebar-bottom">{sidebarBottom}</div>}
      </div>
    </Sider>
  )

  if (isMobile) {
    return (
      <Drawer
        maskClosable
        closable={false}
        onClose={() => setMobileNavOpen(false)}
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
