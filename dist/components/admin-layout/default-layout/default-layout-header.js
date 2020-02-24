import React, { useContext } from 'react';
import { Col, Layout, Row } from 'antd';
import useIsMobile from '../../../lib/hooks/use-is-mobile';
import { DefaultLayoutContext } from './default-layout-context';
import { IconMenu, IconMenuClose, IconMenuOpen } from '../../icons';
const {
  Header
} = Layout;

const DefaultLayoutHeader = ({
  logoMobile,
  headerRight,
  sidebarWidth,
  sidebarCollapsedWidth
}) => {
  const isMobile = useIsMobile();
  const {
    mobileNavOpen,
    setMobileNavOpen,
    sidebarCollapsed,
    setSidebarCollapsed
  } = useContext(DefaultLayoutContext);
  return /*#__PURE__*/React.createElement(Header, {
    style: {
      left: isMobile ? 0 : sidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth
    }
  }, /*#__PURE__*/React.createElement(Row, {
    align: "top",
    style: {
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      marginTop: isMobile ? 1 : 0
    }
  }, isMobile && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Col, {
    flex: "1 1"
  }, /*#__PURE__*/React.createElement(IconMenu, {
    style: {
      fontSize: 18,
      padding: 5,
      marginTop: 5
    },
    onClick: () => setMobileNavOpen(!mobileNavOpen)
  })), /*#__PURE__*/React.createElement(Col, {
    flex: "1 0",
    style: {
      textAlign: 'center'
    }
  }, logoMobile)), !isMobile && /*#__PURE__*/React.createElement(Col, null, sidebarCollapsed ? /*#__PURE__*/React.createElement(IconMenuOpen, {
    style: {
      fontSize: 18,
      padding: 5,
      marginTop: 5
    },
    onClick: () => setSidebarCollapsed(false)
  }) : /*#__PURE__*/React.createElement(IconMenuClose, {
    style: {
      fontSize: 18,
      padding: 5,
      marginTop: 5
    },
    onClick: () => setSidebarCollapsed(true)
  })), headerRight && /*#__PURE__*/React.createElement(Col, {
    flex: "1 1",
    className: "ant-layout-header-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ant-layout-header-right-content"
  }, headerRight))));
};

export default DefaultLayoutHeader;