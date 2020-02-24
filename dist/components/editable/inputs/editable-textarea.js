function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import { useTextareaScrollbarWidth } from '../../../lib/hooks';
import Editable from '../editable';

const EditableTextarea = ({ ...props
}) => {
  const [value, setValue] = useState(props.value);
  const [, setRenderTrigger] = useState(0);
  const textArea = useRef(null);
  const textAreaScrollbarWidth = useTextareaScrollbarWidth(textArea.current);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);
  return /*#__PURE__*/React.createElement(Editable, _extends({}, props, {
    onStartEdit: () => setTimeout(() => setRenderTrigger(n => n + 1)),
    onExitEdit: useCallback(() => setValue(props.value), [props.value]),
    editElement: (buttons, triggerSubmit) => /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Input.TextArea, {
      ref: textArea,
      style: {
        paddingRight: textAreaScrollbarWidth + 45 + 11
      },
      rows: 7,
      autoFocus: true,
      value: value,
      onChange: e => {
        setValue(e.target.value);
      },
      placeholder: props.placeholder
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: textAreaScrollbarWidth + 11,
        top: '50%',
        marginTop: -11,
        zIndex: 2
      }
    }, buttons(() => triggerSubmit(value))))
  }));
};

export default EditableTextarea;