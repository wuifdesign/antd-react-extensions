import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import ErrorPage, { ErrorPageProps } from './error-page'

export default {
  component: ErrorPage,
  title: 'Components/Error Page'
} as Meta

const Template: Story<PropsWithChildren<ErrorPageProps>> = (args) => <ErrorPage {...args} />

export const Page404 = Template.bind({})
Page404.args = {
  type: 404
}

export const Page403 = Template.bind({})
Page403.args = {
  type: 403
}

export const Page500 = Template.bind({})
Page500.args = {
  type: 500
}
