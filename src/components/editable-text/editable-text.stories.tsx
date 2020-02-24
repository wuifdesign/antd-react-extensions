import React from 'react';
import EditableText from './editable-text';

export default {
  title: 'Editable Text',
  component: EditableText,
};

export const Default = () => (
  <div style={{ padding: 25, maxWidth: 300 }}>
    <EditableText initialValue={'John Doe'}/>
  </div>
);

export const TextArea = () => (
  <div style={{ padding: 25, maxWidth: 300 }}>
    <EditableText type={'textarea'} initialValue={'John Doe'}/>
  </div>
);

export const DatePicker = () => (
  <div style={{ padding: 25, maxWidth: 300 }}>
    <EditableText type={'date'} initialValue={'2019-11-12'}/>
  </div>
);
