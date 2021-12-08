import React from 'react'
import { Col, Layout, Row } from 'antd'
import { useDefaultLayoutContext } from './default-layout-context'
import { IconMenu, IconMenuClose, IconMenuOpen } from '../../../icons'
import { useIsMobile } from '../../../config-provider'
import { FCWithoutChildren } from '../../../../utils'

const { Header } = Layout

export type AdminLayoutHeaderProps = {
  logoMobile: React.ReactNode | string
  headerRight?: React.ReactNode
  sidebarWidth?: number
  sidebarCollapsedWidth?: number
}

const DefaultLayoutHeader: FCWithoutChildren<AdminLayoutHeaderProps> = ({
  logoMobile,
  headerRight,
  sidebarWidth,
  sidebarCollapsedWidth
}) => {
  const isMobile = useIsMobile()
  const { mobileNavOpen, setMobileNavOpen, sidebarCollapsed, setSidebarCollapsed } = useDefaultLayoutContext()

  return (
    <Header
      className="default-layout-header"
      style={{ left: isMobile ? 0 : sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth }}
    >
      <Row align="stretch" style={{ flexWrap: 'nowrap', justifyContent: 'space-between', marginTop: isMobile ? 1 : 0 }}>
        {isMobile && (
          <>
            <Col flex="1 1">
              <IconMenu
                style={{ fontSize: 18, padding: 5, marginTop: 5 }}
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
              />
            </Col>
            <Col flex="1 0" style={{ textAlign: 'center' }}>
              {logoMobile}
            </Col>
          </>
        )}
        {!isMobile && (
          <Col>
            {sidebarCollapsed ? (
              <IconMenuOpen
                style={{ fontSize: 18, padding: 5, marginTop: 5 }}
                onClick={() => setSidebarCollapsed(false)}
              />
            ) : (
              <IconMenuClose
                style={{ fontSize: 18, padding: 5, marginTop: 5 }}
                onClick={() => setSidebarCollapsed(true)}
              />
            )}
          </Col>
        )}
        {headerRight && (
          <Col flex="1 1">
            <div className="default-layout-header-right">{headerRight}</div>
          </Col>
        )}
      </Row>
    </Header>
  )
}

export default DefaultLayoutHeader
