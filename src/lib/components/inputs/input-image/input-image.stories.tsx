import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import InputImage, { InputImageProps } from './input-image'

export default {
  component: InputImage,
  title: 'Components/Input/Image',
  argTypes: {
    defaultImage: { control: { type: 'text' } }
  }
} as Meta

const Template: Story<PropsWithChildren<InputImageProps>> = (args) => <InputImage {...args} />

export const Base = Template.bind({})
Base.args = {}

export const WithDefaultImage = Template.bind({})
WithDefaultImage.args = {
  defaultImage: 'https://placekitten.com/300/200'
}

export const Clearable = Template.bind({})
Clearable.args = {
  defaultImage: 'https://placekitten.com/300/200',
  clearable: true
}
