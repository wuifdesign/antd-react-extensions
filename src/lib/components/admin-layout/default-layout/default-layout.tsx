import React, { useCallback, useMemo, useState } from 'react'
import { Layout } from 'antd'
import withBreadcrumbs, { BreadcrumbsRoute } from 'react-router-breadcrumbs-hoc'
import useIsMobile from '../../../lib/hooks/use-is-mobile'
import DefaultLayoutBreadcrumbs from './default-layout-breadcrumbs'
import DefaultLayoutSidebar, { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from './default-layout-sidebar'
import DefaultLayoutHeader from './default-layout-header'
import { MenuElement } from '../menu-element.type'
import { RouteElement } from '../route-element.type'
import { DefaultLayoutContext } from './default-layout-context'
import useBodyClass from '../../../lib/hooks/use-body-class'
import { PAGE_PADDING } from '../admin-layout-config'

export type DefaultLayoutProps = {
  menu: MenuElement[]
  logo: React.ReactNode | string
  logoMobile?: React.ReactNode | string
  logoCollapsed?: React.ReactNode | string
  sidebarTheme?: 'light' | 'dark'
  sidebarBottom?: React.ReactNode | string
  hideFrame?: boolean
  hideBreadcrumbs?: boolean
  sidebarWidth?: number
  sidebarCollapsedWidth?: number
  sidebarMenuPrepend?: React.ReactNode | string
  sidebarMenuPrependCollapsed?: React.ReactNode | string
  sidebarMenuAppend?: React.ReactNode | string
  sidebarMenuAppendCollapsed?: React.ReactNode | string
  headerRight?: React.ReactElement
}

export type DefaultLayoutPropsInternal = DefaultLayoutProps & {
  routes: RouteElement[]
}

export const DefaultLayout: React.FC<DefaultLayoutPropsInternal> = ({
  logo,
  logoMobile = logo,
  logoCollapsed,
  routes,
  menu,
  hideFrame = false,
  hideBreadcrumbs = false,
  sidebarMenuPrepend,
  sidebarMenuPrependCollapsed = sidebarMenuPrepend,
  sidebarMenuAppend,
  sidebarMenuAppendCollapsed = sidebarMenuAppend,
  sidebarBottom,
  sidebarTheme = 'light',
  headerRight,
  sidebarWidth = SIDEBAR_WIDTH,
  sidebarCollapsedWidth = SIDEBAR_COLLAPSED_WIDTH,
  children
}) => {
  useBodyClass('default-layout')

  const isMobile = useIsMobile()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const setMobileNavOpenFunction = useCallback((open) => setMobileNavOpen(open), [])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const setSidebarCollapsedFunction = useCallback((open) => setSidebarCollapsed(open), [])

  const BreadCrumbs = useMemo(
    () => withBreadcrumbs(routes as BreadcrumbsRoute[], { disableDefaults: true })(DefaultLayoutBreadcrumbs),
    [routes]
  )

  let currentSidebarWidth = sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth
  if (hideFrame) {
    currentSidebarWidth = 0
  }

  return (
    <DefaultLayoutContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen: setMobileNavOpenFunction,
        sidebarCollapsed: sidebarCollapsed,
        setSidebarCollapsed: setSidebarCollapsedFunction
      }}
    >
      {!hideFrame && (
        <>
          <DefaultLayoutSidebar
            sidebarBottom={sidebarBottom}
            logo={logo}
            logoCollapsed={logoCollapsed}
            menu={menu}
            sidebarTheme={sidebarTheme}
            sidebarWidth={sidebarWidth}
            sidebarCollapsedWidth={sidebarCollapsedWidth}
            menuAppend={sidebarCollapsed ? sidebarMenuAppendCollapsed : sidebarMenuAppend}
            menuPrepend={sidebarCollapsed ? sidebarMenuPrependCollapsed : sidebarMenuPrepend}
          />
          <DefaultLayoutHeader
            logoMobile={logoMobile}
            headerRight={headerRight}
            sidebarWidth={sidebarWidth}
            sidebarCollapsedWidth={sidebarCollapsedWidth}
          />
        </>
      )}

      <Layout
        className="ant-layout-content"
        style={{
          marginTop: hideFrame ? 0 : undefined,
          marginLeft: isMobile ? 0 : currentSidebarWidth,
          padding: isMobile ? PAGE_PADDING / 2 : PAGE_PADDING
        }}
      >
        {!hideBreadcrumbs && <BreadCrumbs />}
        {children}
      </Layout>
    </DefaultLayoutContext.Provider>
  )
}

export default DefaultLayout
