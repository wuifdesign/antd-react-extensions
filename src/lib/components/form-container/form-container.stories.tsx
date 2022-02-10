import React, { PropsWithChildren, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { FormContainer, FormContainerProps } from './form-container'
import { EnhancedButton } from '../enhanced-button'
import { IconSave } from '../icons'
import { Form, Input } from 'antd'

export default {
  component: FormContainer,
  title: 'Components/Form Container'
} as Meta

const Template: Story<PropsWithChildren<FormContainerProps>> = (args) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  return (
    <>
      {args.type !== 'inline' && (
        <EnhancedButton style={{ margin: 25 }} onClick={() => setDrawerVisible(true)}>
          Open {args.type}
        </EnhancedButton>
      )}
      <FormContainer
        {...args}
        name="default"
        title={'Modal Form'}
        visible={drawerVisible}
        onCancel={() => setDrawerVisible(false)}
        onSubmit={(value) => {
          console.log(value)
          setDrawerVisible(false)
          return Promise.resolve()
        }}
        buttons={{
          left: ['reset'],
          right: ['cancel', 'submit']
        }}
        submitButtonIcon={<IconSave />}
        submitButtonText={'Save'}
        submitButtonDisabled={buttonDisabled}
        submitButtonProps={{ 'data-cy': 'submit' }}
        cancelButtonProps={{ 'data-cy': 'cancel' }}
        initialValues={{ name: 'John Doe' }}
      >
        <EnhancedButton style={{ marginBottom: 16 }} block onClick={() => setButtonDisabled(!buttonDisabled)}>
          Toggle Submit Disabled
        </EnhancedButton>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
          <Input placeholder="Please enter a name" />
        </Form.Item>
      </FormContainer>
    </>
  )
}

export const Inline = Template.bind({})
Inline.args = {
  type: 'inline'
}

export const Modal = Template.bind({})
Modal.args = {
  type: 'modal'
}

export const Drawer = Template.bind({})
Drawer.args = {
  type: 'drawer'
}

export const FormLoadingModal = Template.bind({})
FormLoadingModal.args = {
  type: 'modal',
  formLoading: true
}

export const FormLoadingDrawer = Template.bind({})
FormLoadingDrawer.args = {
  type: 'drawer',
  formLoading: true
}
