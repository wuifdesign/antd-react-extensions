import React from 'react';
import { Result } from 'antd';
const baseTranslations = {
  403: {
    title: '403',
    description: 'Sorry, you are not authorized to access this page.'
  },
  404: {
    title: '404',
    description: 'Sorry, the page you visited does not exist.'
  },
  500: {
    title: '500',
    description: 'Sorry, something went wrong please try again.'
  }
};

const ErrorPage = ({
  type,
  description,
  translations = {}
}) => {
  var _translations$type, _translations$type2;

  const _title = ((_translations$type = translations[type]) === null || _translations$type === void 0 ? void 0 : _translations$type.title) || baseTranslations[type].title;

  const _description = description || ((_translations$type2 = translations[type]) === null || _translations$type2 === void 0 ? void 0 : _translations$type2.description) || baseTranslations[type].description;

  return /*#__PURE__*/React.createElement(Result, {
    status: type,
    title: _title,
    subTitle: _description
  });
};

export default ErrorPage;