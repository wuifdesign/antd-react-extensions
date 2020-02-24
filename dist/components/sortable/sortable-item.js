function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MenuOutlined } from '@ant-design/icons';
import { IconDelete } from '../icons';
import { Button } from '../button';

const SortableItem = ({
  id,
  item,
  disabled = false,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    disabled
  });
  const classNames = ['sortable-item'];

  if (isDragging) {
    classNames.push('dragging');
  }

  if (disabled) {
    classNames.push('disabled');
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classNames.join(' '),
    ref: setNodeRef,
    style: style
  }, !disabled && /*#__PURE__*/React.createElement("button", _extends({}, attributes, listeners, {
    className: "sortable-handle"
  }), /*#__PURE__*/React.createElement(MenuOutlined, null)), /*#__PURE__*/React.createElement("div", {
    className: "sortable-content"
  }, item), !!onDelete && /*#__PURE__*/React.createElement(Button, {
    size: "small",
    type: "link",
    danger: true,
    className: "sortable-delete",
    onClick: () => onDelete(id),
    title: "Delete Item"
  }, /*#__PURE__*/React.createElement(IconDelete, null)));
};

export default SortableItem;