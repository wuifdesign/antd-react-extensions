function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useEffect, useState } from 'react';
import { Input } from 'antd';
import Editable from '../editable';

const EditableInput = ({ ...props
}) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return /*#__PURE__*/React.createElement(Editable, _extends({}, props, {
    onExitEdit: useCallback(() => setValue(props.value), [props.value]),
    editElement: (buttons, triggerSubmit) => /*#__PURE__*/React.createElement(Input, {
      autoFocus: true,
      defaultValue: value,
      onChange: e => setValue(e.target.value),
      onKeyDown: e => {
        if (e.keyCode === 13) {
          triggerSubmit(value);
        }
      },
      suffix: buttons(() => triggerSubmit(value)),
      placeholder: props.placeholder
    })
  }));
};

export default EditableInput;