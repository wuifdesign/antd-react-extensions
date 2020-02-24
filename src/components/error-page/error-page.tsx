import React from 'react';
import { Result } from 'antd';

export type ErrorPageProps = {
  type: 403 | 404 | 500
}

const ErrorPage: React.FC<ErrorPageProps> = ({ type }) => {
  switch (type) {
    case 404:
      return (
        <Result
          status={'404' as any}
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
      );
    case 403:
      return (
        <Result
          status={'403' as any}
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
        />
      );
    default:
      return (
        <Result
          status={'500' as any}
          title="500"
          subTitle="Sorry, something went wrong."
        />
      );
  }
};

export default ErrorPage;
