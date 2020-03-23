import React, { useEffect, useRef, useState } from 'react';
import { Button, Drawer, Form, Modal } from 'antd';
import { ButtonType } from 'antd/lib/button/button';
import { FormInstance } from 'antd/es/form';
import { IconUndo } from '../../lib/icons';

export type FormDrawerProps = {
  visible: boolean,
  width?: number,
  onClose: () => void,
  onSubmit: (value: any) => Promise<unknown>,
  title?: string,
  type?: 'drawer' | 'modal',
  hideActionButtons?: boolean,
  submitButtonType?: ButtonType,
  submitButtonIcon?: JSX.Element,
  submitButtonText?: string,
  submitButtonDisabled?: boolean,
  initialValues?: object,
};

export const FormOverlay: React.FC<FormDrawerProps> = (
  {
    children,
    width = 600,
    title,
    onSubmit,
    type = 'modal',
    initialValues = {},
    visible = true,
    hideActionButtons = false,
    submitButtonDisabled = false,
    onClose,
    submitButtonType = 'primary',
    submitButtonText = 'Save',
    submitButtonIcon,
  },
) => {
  const formRef = useRef<FormInstance>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && formRef.current) {
      formRef.current.resetFields();
    }
  }, [visible, formRef]);

  const triggerSubmit = (value: any) => {
    setLoading(true);
    onSubmit(value).then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };

  const content = (
    <Form
      ref={formRef}
      onFinish={triggerSubmit}
      layout="vertical"
      className="ant-drawer-custom"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifySelf: 'stretch',
      }}
      initialValues={initialValues}
    >
      <div
        className="ant-drawer-custom-body"
        style={{
          flex: 1,
          paddingBottom: 24,
        }}
      >
        {children}
      </div>
      <div
        className="ant-drawer-custom-footer"
        style={{
          display: 'flex',
          textAlign: 'right',
          margin: '0 -24px -24px',
          padding: '15px 24px',
          borderTop: '1px solid #f0f0f0',
        }}
      >
        <div style={{ marginRight: 'auto' }}>
          {
            !hideActionButtons && (
              <Button
                type="link"
                onClick={() => (formRef.current ? formRef.current.resetFields() : null)}
                icon={<IconUndo/>}
              >
                Reset
              </Button>
            )
          }
        </div>
        <Button onClick={onClose} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        {
          !hideActionButtons && (
            <Button
              disabled={submitButtonDisabled}
              htmlType="submit"
              type={submitButtonType}
              loading={loading}
              icon={submitButtonIcon}
            >
              {submitButtonText}
            </Button>
          )
        }
      </div>
    </Form>
  );

  if (type === 'drawer') {
    return (
      <Drawer
        title={title}
        width={width}
        visible={visible}
        onClose={onClose}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Modal
      width={width}
      title={title}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {content}
    </Modal>
  );
};

export default FormOverlay;
