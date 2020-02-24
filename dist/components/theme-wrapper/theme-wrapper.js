import React, { useState } from 'react';
import { ThemeContext } from './theme-context';

const mapCssVariables = cssVariables => {
  const lines = [];

  for (const key of Object.keys(cssVariables)) {
    lines.push(`${key}:${cssVariables[key]}`);
  }

  return lines.join(';');
};

const ThemeWrapper = ({
  children
}) => {
  const [css, setCss] = useState();
  const [cssVariables, setCssVariables] = useState({});
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: {
      cssVariables,
      setCssVariables,
      css,
      setCss
    }
  }, !!Object.keys(cssVariables).length && /*#__PURE__*/React.createElement("style", null, `:root {${mapCssVariables(cssVariables)}}`), !!css && /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, children));
};

export default ThemeWrapper;