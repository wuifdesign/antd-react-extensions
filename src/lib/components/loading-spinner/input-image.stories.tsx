import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { LoadingSpinner, LoadingSpinnerProps } from './loading-spinner'

export default {
  component: LoadingSpinner,
  title: 'Components/Loading Spinner'
} as Meta

const Template: Story<PropsWithChildren<LoadingSpinnerProps>> = (args) => <LoadingSpinner {...args} />

export const Base = Template.bind({})
Base.args = {}

export const WithOffset = Template.bind({})
WithOffset.args = {
  marginTopOffset: 50,
  marginVertical: 50
}
