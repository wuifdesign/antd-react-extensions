function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect, useRef, useState } from 'react';
import { Drawer, Form, Modal, Space } from 'antd';
import { IconUndo } from '../icons';
import Button from '../button/button';

const FormOverlay = ({
  visible,
  onClose,
  onSubmit,
  width = 600,
  title,
  type = 'modal',
  submitButtonProps = {
    type: 'primary'
  },
  submitButtonText = 'Save',
  submitButtonIcon,
  submitButtonDisabled = false,
  cancelButtonProps = {},
  cancelButtonText = 'Cancel',
  buttons = {
    left: ['reset'],
    right: ['cancel', 'submit']
  },
  initialValues = {},
  children
}) => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (visible && formRef.current) {
      formRef.current.resetFields();
    }
  }, [visible, formRef]);

  const triggerSubmit = value => {
    setLoading(true);
    onSubmit(value).then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };

  const renderButtons = buttons => {
    const parsedButtons = [];

    for (const button of buttons) {
      switch (button) {
        case 'submit':
          parsedButtons.push( /*#__PURE__*/React.createElement(Button, _extends({
            disabled: submitButtonDisabled,
            htmlType: "submit",
            loading: loading,
            icon: submitButtonIcon
          }, submitButtonProps), submitButtonText));
          break;

        case 'cancel':
          parsedButtons.push( /*#__PURE__*/React.createElement(Button, _extends({
            onClick: onClose
          }, cancelButtonProps), cancelButtonText));
          break;

        case 'reset':
          parsedButtons.push( /*#__PURE__*/React.createElement(Button, {
            type: "link",
            onClick: () => formRef.current ? formRef.current.resetFields() : null,
            icon: /*#__PURE__*/React.createElement(IconUndo, null)
          }, "Reset"));
          break;

        default:
          parsedButtons.push(button);
      }
    }

    return parsedButtons.map((btn, index) => /*#__PURE__*/React.createElement("div", {
      key: index
    }, btn));
  };

  const content = /*#__PURE__*/React.createElement(Form, {
    ref: formRef,
    onFinish: triggerSubmit,
    layout: "vertical",
    className: "ant-drawer-custom",
    initialValues: initialValues
  }, /*#__PURE__*/React.createElement("div", {
    className: "ant-drawer-custom-body"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "ant-drawer-custom-footer"
  }, /*#__PURE__*/React.createElement(Space, {
    style: {
      marginRight: 'auto'
    }
  }, renderButtons(buttons.left)), /*#__PURE__*/React.createElement(Space, null, renderButtons(buttons.right))));

  if (type === 'drawer') {
    return /*#__PURE__*/React.createElement(Drawer, {
      title: title,
      width: width,
      visible: visible,
      onClose: onClose
    }, content);
  }

  return /*#__PURE__*/React.createElement(Modal, {
    width: width,
    title: title,
    visible: visible,
    onCancel: onClose,
    footer: null
  }, content);
};

export default FormOverlay;