import * as React from 'react';
export const DefaultLayoutContext = /*#__PURE__*/React.createContext({
  sidebarCollapsed: true,
  setSidebarCollapsed: () => null,
  mobileNavOpen: true,
  setMobileNavOpen: () => null
});