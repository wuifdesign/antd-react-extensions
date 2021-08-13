import React from 'react'
import { ErrorPage } from '../error-page/error-page'

export type ErrorBoundaryProps = {
  showFallback?: boolean
  fallback?: React.ReactNode
}

/**
 * Catch any error within component.
 *
 * Use `ErrorBoundary.setOnErrorHandler((error, info) => console.log(error, info))` to log errors if needed.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  static defaultProps: ErrorBoundaryProps = {
    showFallback: true,
    fallback: <ErrorPage type={500} />
  }

  static onError: (error: Error | null, info: object) => void = () => null

  static setOnErrorHandler = (handler: (error: Error | null, info: object) => void) => {
    ErrorBoundary.onError = handler
  }

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error | null, info: object) {
    ErrorBoundary.onError(error, info)
  }

  render() {
    const { children, showFallback, fallback } = this.props
    const { hasError } = this.state

    if (hasError) {
      return showFallback ? fallback : null
    }

    return children
  }
}
