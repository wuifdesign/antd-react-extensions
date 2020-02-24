import * as React from 'react';
import { useContext } from 'react';
export const LayoutContext = /*#__PURE__*/React.createContext({
  fullPageLoading: false,
  setFullPageLoading: () => null
});
export const useLayoutContext = () => useContext(LayoutContext);