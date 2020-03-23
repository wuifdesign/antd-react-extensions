import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Button, Form, Input } from 'antd';
import FormOverlay from './form-overlay';
import { IconSave } from '../../lib/icons';

export default {
  title: 'Form Overlay',
  component: FormOverlay,
};

export const Modal = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);

  return (
    <>
      <Button style={{ margin: 25 }} onClick={() => setDrawerVisible(true)}>Open Modal</Button>
      <FormOverlay
        title={'Modal Form'}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={(value) => {
          action('submit')(value);
          return Promise.resolve();
        }}
        submitButtonIcon={<IconSave/>}
        submitButtonText={'Save'}
        submitButtonDisabled={buttonDisabled}
        hideActionButtons={!buttonVisible}
        initialValues={{ name: 'John Doe' }}
      >
        <Button style={{ marginBottom: 16 }} block onClick={() => setButtonDisabled(!buttonDisabled)}>
          Toggle Submit Disabled
        </Button>
        <Button style={{ marginBottom: 16 }} block onClick={() => setButtonVisible(!buttonVisible)}>
          Hide Action Buttons
        </Button>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter a name' },
          ]}
        >
          <Input placeholder="Please enter a name"/>
        </Form.Item>
      </FormOverlay>
    </>
  );
};

export const Drawer = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <Button style={{ margin: 25 }} onClick={() => setDrawerVisible(true)}>Open Drawer</Button>
      <FormOverlay
        title={'Drawer Form'}
        type="drawer"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={(value) => {
          action('submit')(value);
          return Promise.resolve();
        }}
        submitButtonIcon={<IconSave/>}
        submitButtonText={'Save'}
        initialValues={{ name: 'John Doe' }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter a name' },
          ]}
        >
          <Input placeholder="Please enter a name"/>
        </Form.Item>
      </FormOverlay>
    </>
  );
};
