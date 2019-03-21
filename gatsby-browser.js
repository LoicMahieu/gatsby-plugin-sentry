import React from 'react'
import * as Sentry from '@sentry/browser'
import { ErrorBoundaryFallbackComponent } from './components/ErrorBoundaryFallbackComponent'

export const onClientEntry = (_, pluginParams) => {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init(pluginParams)
  }
}

export const wrapRootElement = ({ element }) => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <ErrorBoundary
        onError={errorHandler}
        FallbackComponent={ErrorBoundaryFallbackComponent}
      >
        {element}
      </ErrorBoundary>
    )
  } else {
    return element
  }
}

const errorHandler = (error, componentStack) => {
  Sentry.withScope(scope => {
    scope.setExtra('componentStack', componentStack)
    Sentry.captureException(error)
  })
}

class ErrorBoundary extends React.Component {
  state = {
    error: null,
    info: null
  }

  componentDidCatch (error, info) {
    const { onError } = this.props

    if (typeof onError === 'function') {
      try {
        /* istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment. */
        errorHandler.call(this, error, info ? info.componentStack : '')
      } catch (ignoredError) {}
    }

    this.setState({ error, info })
  }

  render () {
    const { children } = this.props
    const { error, info } = this.state

    if (error !== null) {
      return (
        <ErrorBoundaryFallbackComponent
          componentStack={
            // istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment.
            info ? info.componentStack : ''
          }
          error={error}
        />
      )
    }

    return children
  }
}
