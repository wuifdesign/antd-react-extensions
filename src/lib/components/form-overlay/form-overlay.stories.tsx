import React, { PropsWithChildren, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import FormOverlay, { FormOverlayProps } from './form-overlay'
import Button from '../button/button'
import { IconSave } from '../icons'
import { Form, Input } from 'antd'

export default {
  component: FormOverlay,
  title: 'Components/Form Overlay'
} as Meta

const Template: Story<PropsWithChildren<FormOverlayProps>> = (args) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  return (
    <>
      <Button style={{ margin: 25 }} onClick={() => setDrawerVisible(true)}>
        Open Modal
      </Button>
      <FormOverlay
        {...args}
        title={'Modal Form'}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
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
      </FormOverlay>
    </>
  )
}

export const Modal = Template.bind({})
Modal.args = {}

export const Drawer = Template.bind({})
Drawer.args = {
  type: 'drawer'
}
