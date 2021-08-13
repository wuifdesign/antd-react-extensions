import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { ImagePreview } from './index'
import { ImagePreviewProps } from './image-preview'

export default {
  component: ImagePreview,
  title: 'Components/Image Preview',
  argTypes: {
    url: { control: { type: 'text' } }
  }
} as Meta

const Template: Story<PropsWithChildren<ImagePreviewProps>> = (args) => <ImagePreview {...args} />

export const Base = Template.bind({})
Base.args = {
  url: 'https://placekitten.com/300/200'
}

export const NoImage = Template.bind({})
NoImage.args = {
  url: undefined
}

export const WithDelete = Template.bind({})
WithDelete.args = {
  ...Base.args,
  onDelete: () => Promise.resolve()
}

export const WithEdit = Template.bind({})
WithEdit.args = {
  ...Base.args,
  onEdit: () => Promise.resolve()
}

export const DifferentSize = Template.bind({})
DifferentSize.args = {
  ...Base.args,
  size: 200
}
