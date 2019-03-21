
import React from 'react'
import * as Sentry from '@sentry/browser'

export const ErrorBoundaryFallbackComponent = () => (
  <div>
    <h1>An error is occured.</h1>
    <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
  </div>
)
