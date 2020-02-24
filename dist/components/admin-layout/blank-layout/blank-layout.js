import React from 'react';
import useBodyClass from '../../../lib/hooks/use-body-class';
export const BlankLayout = ({
  children
}) => {
  useBodyClass('blank-page');
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};
export default BlankLayout;