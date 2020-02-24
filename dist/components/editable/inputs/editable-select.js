function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Select } from 'antd';
import Editable from '../editable';

const EditableSelect = ({
  selectProps,
  renderDisplay,
  ...props
}) => {
  const [value, setValue] = useState(props.value);
  const isSingleSelect = (selectProps === null || selectProps === void 0 ? void 0 : selectProps.mode) !== 'multiple' && (selectProps === null || selectProps === void 0 ? void 0 : selectProps.mode) !== 'tags';
  return /*#__PURE__*/React.createElement(Editable, _extends({}, props, {
    valueDisplay: value => {
      if (value) {
        if (!Array.isArray(value)) {
          value = [value];
        }

        const labels = [];

        for (const val of value) {
          var _selectProps$options;

          const currentValue = selectProps === null || selectProps === void 0 ? void 0 : (_selectProps$options = selectProps.options) === null || _selectProps$options === void 0 ? void 0 : _selectProps$options.find(option => option.value === val);

          if (currentValue) {
            labels.push(currentValue);
          }
        }

        return renderDisplay ? renderDisplay(labels) : labels.map(item => item.label).join(', ');
      }

      return undefined;
    },
    editElement: (buttons, triggerSubmit) => /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Select, _extends({
      style: {
        width: '100%'
      },
      autoFocus: true,
      defaultValue: props.value,
      defaultOpen: true,
      onChange: e => {
        setValue(e);

        if (isSingleSelect) {
          triggerSubmit(e);
        }
      },
      placeholder: props.placeholder
    }, selectProps)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 11,
        top: '50%',
        marginTop: -11,
        zIndex: 2
      }
    }, buttons(isSingleSelect ? undefined : () => triggerSubmit(value))))
  }));
};

export default EditableSelect;