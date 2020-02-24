import React from 'react';
import ErrorPage from '../error-page/error-page';

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() { // (error: Error | null, info: object)
    // Log error if needed
  }

  render() {
    const children = this.props;
    const hasError = this.state;

    if (hasError) {
      return <ErrorPage type={500}/>;
    }

    return children;
  }
}

export default ErrorBoundary;
