function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import Editable from '../editable';

const EditableDateRange = ({
  dateRangePickerProps,
  ...props
}) => {
  var _props$value;

  let defaultValue;

  if (((_props$value = props.value) === null || _props$value === void 0 ? void 0 : _props$value.length) === 2 && props.value[0] && props.value[1]) {
    defaultValue = [moment(props.value[0]), moment(props.value[1])];
  }

  return /*#__PURE__*/React.createElement(Editable, _extends({}, props, {
    valueDisplay: value => {
      if (value) {
        return `${value[0]} - ${value[1]}`;
      }

      return undefined;
    },
    editElement: (buttons, triggerSubmit) => /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(DatePicker.RangePicker, _extends({
      allowClear: false,
      style: {
        width: '100%',
        paddingRight: 33
      },
      placeholder: props.placeholder,
      defaultOpen: true,
      autoFocus: true,
      defaultValue: defaultValue,
      onChange: (_, dates) => {
        triggerSubmit(dates);
      }
    }, dateRangePickerProps)), /*#__PURE__*/React.createElement("div", {
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

export default EditableDateRange;