import { Modal } from 'antd';
import { IconDelete, IconWarning } from '../components/icons';
import React from 'react';
export const confirmDelete = props => {
  Modal.confirm({
    icon: /*#__PURE__*/React.createElement(IconWarning, null),
    content: 'This action cannot be undone.',
    okText: 'Delete',
    okButtonProps: {
      icon: /*#__PURE__*/React.createElement(IconDelete, null)
    },
    okType: 'danger',
    ...props
  });
};
export const confirmAction = props => {
  Modal.confirm({
    icon: /*#__PURE__*/React.createElement(IconWarning, null),
    okText: 'Continue',
    okType: 'primary',
    ...props
  });
};