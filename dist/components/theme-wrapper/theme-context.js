import React, { useContext } from 'react';
export const ThemeContext = /*#__PURE__*/React.createContext({
  css: undefined,
  setCss: () => null,
  cssVariables: {},
  setCssVariables: () => null
});
export const useTheme = () => {
  const context = useContext(ThemeContext);
  return {
    css: context.css,
    setCss: context.setCss,
    cssVariables: context.cssVariables,
    setCssVariables: context.setCssVariables
  };
};