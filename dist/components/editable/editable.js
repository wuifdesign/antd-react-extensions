import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import { IconCancel, IconEdit, IconLoading, IconSave } from '../icons';

const Editable = ({
  value,
  valuePlaceholder = '-',
  editAble = true,
  style,
  onSubmit,
  valueDisplay = value => value,
  editElement,
  onStartEdit,
  onExitEdit
}) => {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const onInitEdit = useCallback(() => {
    setEditMode(true);

    if (onStartEdit) {
      onStartEdit();
    }
  }, [onStartEdit]);
  const onFinishEdit = useCallback(() => {
    if (onExitEdit) {
      onExitEdit();
    }

    setEditMode(false);
  }, [onExitEdit]);
  const onCancel = useCallback(() => {
    onFinishEdit();
  }, [onFinishEdit]);
  const onSave = useCallback(newValue => {
    if (loading) {
      return;
    }

    if (newValue !== value) {
      if (onSubmit) {
        setLoading(true);
        onSubmit(newValue).then(formValue => {
          onFinishEdit();
          return formValue;
        }).finally(() => {
          setLoading(false);
        });
      } else {
        onFinishEdit();
      }
    } else {
      onFinishEdit();
    }
  }, [onSubmit, value, onFinishEdit, loading]);
  const editButtons = useCallback(saveHandler => /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(IconLoading, null) : /*#__PURE__*/React.createElement(IconSave, null)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "editable-btn",
    onClick: onCancel,
    title: "Cancel"
  }, /*#__PURE__*/React.createElement(IconCancel, null)), !!saveHandler && /*#__PURE__*/React.createElement("button", {
    className: "editable-btn",
    style: {
      marginLeft: 10
    },
    onClick: saveHandler,
    title: "Save"
  }, /*#__PURE__*/React.createElement(IconSave, null)))), [loading, onCancel]);

  if (editMode) {
    return /*#__PURE__*/React.createElement("div", {
      className: "editable editable-input"
    }, editElement(editButtons, onSave));
  }

  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "editable editable-display"
  }, /*#__PURE__*/React.createElement("span", {
    className: !value ? 'text-muted' : '',
    style: {
      paddingTop: 3,
      paddingBottom: 3
    }
  }, valueDisplay(value) || valuePlaceholder), editAble && /*#__PURE__*/React.createElement(Button, {
    title: "Edit Data",
    type: "link",
    style: {
      padding: 0,
      marginLeft: 5
    },
    onClick: onInitEdit
  }, /*#__PURE__*/React.createElement(IconEdit, null))));
};

export default Editable;