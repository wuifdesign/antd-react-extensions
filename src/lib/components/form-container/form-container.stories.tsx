import React, { PropsWithChildren, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { FormContainer, FormContainerProps } from './form-container'
import { Button } from '../button/button'
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
        <Button style={{ margin: 25 }} onClick={() => setDrawerVisible(true)}>
          Open {args.type}
        </Button>
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
        initialValues={{ name: 'John Doe' }}
      >
        <Button style={{ marginBottom: 16 }} block onClick={() => setButtonDisabled(!buttonDisabled)}>
          Toggle Submit Disabled
        </Button>
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
