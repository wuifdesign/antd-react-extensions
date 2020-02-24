import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import ErrorBoundary, { ErrorBoundaryProps } from './error-boundary'

export default {
  component: ErrorBoundary,
  title: 'Components/Error Boundary'
} as Meta

const ComponentWithError = () => {
  throw new Error('Error')
}

const Template: Story<PropsWithChildren<ErrorBoundaryProps>> = (args) => (
  <ErrorBoundary {...args}>
    <ComponentWithError />
  </ErrorBoundary>
)

export const Base = Template.bind({})
Base.args = {
  showFallback: true
}

export const CustomFallback = Template.bind({})
CustomFallback.args = {
  fallback: <div>My Custom Fallback</div>
}

export const NoFallback = Template.bind({})
NoFallback.args = {
  showFallback: false
}
