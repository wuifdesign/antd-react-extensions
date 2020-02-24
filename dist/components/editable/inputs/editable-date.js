function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import Editable from '../editable';

const EditableDate = ({
  datePickerProps,
  ...props
}) => {
  const defaultValue = props.value ? moment(props.value) : undefined;
  return /*#__PURE__*/React.createElement(Editable, _extends({}, props, {
    editElement: (buttons, triggerSubmit) => /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(DatePicker, _extends({
      allowClear: false,
      style: {
        width: '100%',
        paddingRight: 33
      },
      placeholder: props.placeholder,
      defaultOpen: true,
      autoFocus: true,
      defaultValue: defaultValue,
      onChange: (_, date) => {
        triggerSubmit(date);
      }
    }, datePickerProps)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 11,
        top: '50%',
        marginTop: -11,
        zIndex: 2
      }
    }, buttons()))
  }));
};

export default EditableDate;