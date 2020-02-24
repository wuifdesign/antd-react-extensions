import React, { useContext } from 'react';
import { Col, Dropdown, Layout, Row } from 'antd';
import useIsMobile from '../../lib/hooks/use-is-mobile';
import { SIDEBAR_WIDTH } from './admin-layout-sidebar';
import { AdminLayoutContext } from './admin-layout-context';
import { IconMenu, IconSetting } from '../../lib/icons';

const { Header } = Layout;

export const HEADER_HEIGHT = 55;

export type AdminLayoutHeaderProps = {
  logoMobile: React.ReactNode | string
}

const AdminLayoutHeader: React.FC<AdminLayoutHeaderProps> = ({ logoMobile }) => {
  const isMobile = useIsMobile();
  const { mobileNavOpen, setMobileNavOpen } = useContext(AdminLayoutContext);

  const menu = (
    <>
      Menu
    </>
  );

  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 190,
        height: HEADER_HEIGHT,
        lineHeight: `${HEADER_HEIGHT}px`,
        background: '#fff',
        paddingLeft: 25,
        paddingRight: 25,
        left: isMobile ? 0 : SIDEBAR_WIDTH,
        right: 0,
      }}
    >
      <Row align="middle" style={{ flexWrap: 'nowrap', marginTop: isMobile ? 1 : 0 }}>
        {
          isMobile && (
            <>
              <Col flex="0">
                <IconMenu
                  style={{ fontSize: 18, padding: 5, marginTop: 5 }}
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                />
              </Col>
              <Col flex="1" style={{ textAlign: 'center', marginTop: -4 }}>
                {logoMobile}
              </Col>
            </>
          )
        }
        <Col flex="0" style={{ marginLeft: 'auto', textAlign: 'right' }}>
          {
            isMobile ? (
              <Dropdown overlay={menu}>
                <IconSetting style={{ fontSize: 18, padding: 5 }}/>
              </Dropdown>
            ) : menu
          }
        </Col>
      </Row>
    </Header>
  );
};

export default AdminLayoutHeader;
