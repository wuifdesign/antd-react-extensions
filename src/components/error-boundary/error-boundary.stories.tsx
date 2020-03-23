import React from 'react';
import ErrorBoundary from './error-boundary';

export default {
  title: 'Error Boundary',
  component: ErrorBoundary,
};

const ComponentWithError = () => {
  throw new Error('Error');
};

export const Default = () => {
  ErrorBoundary.setOnErrorHandler((error, info) => window.console.log(error, info));

  return (
    <ErrorBoundary>
      <ComponentWithError/>
    </ErrorBoundary>
  );
};
