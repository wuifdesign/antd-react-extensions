import React, { useState } from 'react';
import { Button } from 'antd';
import { IconDelete, IconEdit, IconFullscreen } from '../icons';
import { confirmDelete } from '../../lib/confirm-dialogs';
import ImageModal from './image-modal';
const buttonsContainerStyle = {
  position: 'absolute',
  top: 5,
  right: 5
};
export const ImagePreview = ({
  url,
  thumbUrl = url,
  style,
  onDelete,
  onEdit,
  size = 100,
  fullscreenButton = true,
  hideBackground = false,
  askForDeleteConfirmation = true,
  emptyText = 'No Image',
  deleteConfirmText = 'Do you really want to delete this image?',
  showFullSizeTitle = 'Show Full Size',
  editImageTitle = 'Edit Image',
  deleteImageTitle = 'Delete Image'
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const triggerDelete = () => {
    if (onDelete) {
      if (askForDeleteConfirmation) {
        confirmDelete({
          title: deleteConfirmText,
          onOk: () => {
            return onDelete();
          }
        });
      } else {
        onDelete();
      }
    }
  };

  const triggerEdit = () => {
    if (onEdit) {
      onEdit();
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size + 'px',
      height: size + 'px',
      maxWidth: size + 'px',
      flexShrink: 0,
      ...style
    },
    className: hideBackground ? undefined : 'transparent-bg'
  }, thumbUrl ? /*#__PURE__*/React.createElement("img", {
    src: thumbUrl,
    alt: thumbUrl,
    style: {
      display: 'block',
      borderRadius: '2px',
      objectFit: 'scale-down',
      width: size + 'px',
      height: size + 'px'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      color: '#999',
      justifyContent: 'center',
      alignItems: 'center',
      letterSpacing: 0.5
    }
  }, emptyText), /*#__PURE__*/React.createElement("div", {
    style: buttonsContainerStyle
  }, fullscreenButton && url && /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    shape: "circle",
    title: showFullSizeTitle,
    size: "small",
    onClick: () => setPreviewVisible(true)
  }, /*#__PURE__*/React.createElement(IconFullscreen, null)), onEdit && /*#__PURE__*/React.createElement(Button, {
    onClick: triggerEdit,
    type: "primary",
    shape: "circle",
    size: "small",
    title: editImageTitle,
    style: {
      marginLeft: 5
    }
  }, /*#__PURE__*/React.createElement(IconEdit, null)), onDelete && /*#__PURE__*/React.createElement(Button, {
    onClick: triggerDelete,
    danger: true,
    shape: "circle",
    size: "small",
    title: deleteImageTitle,
    style: {
      marginLeft: 5
    }
  }, /*#__PURE__*/React.createElement(IconDelete, null))), url && /*#__PURE__*/React.createElement(ImageModal, {
    visible: previewVisible,
    imageUrl: url,
    onClose: () => setPreviewVisible(false)
  }));
};
export default ImagePreview;