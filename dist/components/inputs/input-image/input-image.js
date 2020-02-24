function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePreview } from '../../image-preview';

const getBase64 = img => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', () => {
      reject(new Error('Failed to load base64 data'));
    });
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(img);
  });
};

export const InputImage = ({
  defaultImage,
  onChange,
  clearable = false,
  imagePreviewProps,
  texts = {
    dropWaiting: "Drag 'n' drop some files here, or click to select files",
    dropActive: 'Drop the files here ...'
  }
}) => {
  const [previewImage, setPreviewImage] = useState(defaultImage);
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0]) {
      getBase64(acceptedFiles[0]).then(data => {
        const split = data.indexOf(';');
        const mimeType = data.substring(5, split);
        const base64 = data.substring(split + ';base64,'.length);

        if (onChange) {
          onChange({
            mimeType,
            base64,
            base64Image: data
          });
        }

        setPreviewImage(data);
      });
    }
  }, [onChange]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    multiple: false
  });

  const onDelete = () => {
    setPreviewImage(undefined);

    if (onChange) {
      onChange({
        mimeType: null,
        base64: null,
        base64Image: null,
        remove: true
      });
    }

    return Promise.resolve();
  };

  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    },
    className: "input-image"
  }, /*#__PURE__*/React.createElement(ImagePreview, _extends({
    askForDeleteConfirmation: false
  }, imagePreviewProps, {
    url: previewImage,
    size: 100,
    onDelete: clearable && previewImage ? onDelete : undefined
  })), /*#__PURE__*/React.createElement("div", _extends({
    className: "drop-zone",
    style: {
      height: 100,
      padding: 10,
      marginLeft: 16,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, getRootProps()), /*#__PURE__*/React.createElement("input", getInputProps()), isDragActive ? /*#__PURE__*/React.createElement("div", null, texts.dropActive) : /*#__PURE__*/React.createElement("div", null, texts.dropWaiting)));
};
export default InputImage;