import React from 'react';
import DataDisplayRow from './data-display-row';
import DataDisplayRowGroup from './data-display-row-group';
import EditableText from '../editable-text/editable-text';

export default {
  title: 'Data Display',
  component: DataDisplayRowGroup,
  subcomponents: { DataDisplayRow },
};

export const Default = () => (
  <div style={{ padding: 25, maxWidth: 400 }}>
    <DataDisplayRowGroup title="User Data">
      <DataDisplayRow label={'ID'}>#123</DataDisplayRow>
      <DataDisplayRow label={'Name'}>John Doe</DataDisplayRow>
      <DataDisplayRow label={'Email'}>john@doe.com</DataDisplayRow>
    </DataDisplayRowGroup>
  </div>
);

export const WithEditText = () => (
  <div style={{ padding: 25, maxWidth: 400 }}>
    <DataDisplayRowGroup title="User Data">
      <DataDisplayRow label={'ID'}>#123</DataDisplayRow>
      <DataDisplayRow label={'Name'}>
        <EditableText initialValue="John Doe"/>
      </DataDisplayRow>
      <DataDisplayRow label={'Email'}>
        <EditableText initialValue="john@doe.com"/>
      </DataDisplayRow>
    </DataDisplayRowGroup>
  </div>
);
