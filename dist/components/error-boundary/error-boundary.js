import React from 'react';
import ErrorPage from '../error-page/error-page';

/**
 * Catch any error within component.
 *
 * Use `ErrorBoundary.setOnErrorHandler((error, info) => console.log(error, info))` to log errors if needed.
 */
class ErrorBoundary extends React.Component {
  static defaultProps = {
    showFallback: true,
    fallback: /*#__PURE__*/React.createElement(ErrorPage, {
      type: 500
    })
  };
  static onError = () => null;
  static setOnErrorHandler = handler => {
    ErrorBoundary.onError = handler;
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    ErrorBoundary.onError(error, info);
  }

  render() {
    const {
      children,
      showFallback,
      fallback
    } = this.props;
    const {
      hasError
    } = this.state;

    if (hasError) {
      return showFallback ? fallback : null;
    }

    return children;
  }

}

export default ErrorBoundary;