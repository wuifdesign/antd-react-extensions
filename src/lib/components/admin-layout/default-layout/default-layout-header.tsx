import React, { useContext } from 'react'
import { Col, Layout, Row } from 'antd'
import { useIsMobile } from '../../../utils/hooks/use-is-mobile'
import { DefaultLayoutContext } from './default-layout-context'
import { IconMenu, IconMenuClose, IconMenuOpen } from '../../icons'

const { Header } = Layout

export type AdminLayoutHeaderProps = {
  logoMobile: React.ReactNode | string
  headerRight?: React.ReactElement
  sidebarWidth?: number
  sidebarCollapsedWidth?: number
}

const DefaultLayoutHeader: React.FC<AdminLayoutHeaderProps> = ({
  logoMobile,
  headerRight,
  sidebarWidth,
  sidebarCollapsedWidth
}) => {
  const isMobile = useIsMobile()
  const { mobileNavOpen, setMobileNavOpen, sidebarCollapsed, setSidebarCollapsed } = useContext(DefaultLayoutContext)

  return (
    <Header style={{ left: isMobile ? 0 : sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth }}>
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
            <div className="ant-layout-header-right">{headerRight}</div>
          </Col>
        )}
      </Row>
    </Header>
  )
}

export default DefaultLayoutHeader
