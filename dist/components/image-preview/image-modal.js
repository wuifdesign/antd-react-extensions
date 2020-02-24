import React from 'react';
import { Modal } from 'antd';
export const ImageModal = ({
  visible,
  imageUrl,
  onClose
}) => {
  return /*#__PURE__*/React.createElement(Modal, {
    width: 900,
    destroyOnClose: true,
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    className: "image-modal",
    visible: visible,
    footer: null,
    onCancel: () => onClose()
  }, /*#__PURE__*/React.createElement("img", {
    alt: imageUrl,
    style: {
      maxWidth: '100%',
      maxHeight: '70vh',
      display: 'block',
      margin: '0 auto'
    },
    src: imageUrl
  }));
};
export default ImageModal;