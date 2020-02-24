import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import { IconCancel, IconEdit, IconLoading, IconSave } from '../../lib/icons';
import { useTextareaScrollbarWidth } from '../../lib/hooks';
import { DatePicker } from '../date-picker';

const { TextArea } = Input;

export type EditableTextProps = {
  onSubmit?: (value: string) => Promise<void>
  initialValue?: string | undefined | null
  valuePlaceholder?: string
  placeholder?: string
  editAble?: boolean
  type?: 'input' | 'textarea' | 'date'
}

export const EditableText: React.FC<EditableTextProps> = (
  {
    initialValue = '',
    type = 'input',
    valuePlaceholder = '-',
    editAble = true,
    placeholder = 'Input a value',
    onSubmit,
  },
) => {
  const [value, setValue] = useState<string>(initialValue || '');
  const [editValue, setEditValue] = useState<string>(value);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textArea, setTextArea] = useState<any>(null);
  const textAreaScrollbarWidth = useTextareaScrollbarWidth(textArea);

  useEffect(() => {
    const newValue = initialValue || '';
    setValue(newValue);
    setEditValue(newValue);
  }, [initialValue]);

  const onCancel = useCallback(() => {
    setEditValue(value);
    setEditMode(false);
  }, [value]);

  const onSave = useCallback(() => {
    if (loading) {
      return;
    }
    if (editValue !== value) {
      if (onSubmit) {
        setLoading(true);
        onSubmit(editValue).then((formValue) => {
          setEditMode(false);
          return formValue;
        }).finally(() => {
          setLoading(false);
        });
      } else {
        setEditMode(false);
      }
    } else {
      setEditMode(false);
    }
  }, [editValue, onSubmit, value, loading]);

  const editButtons = (
    <>
      {
        !loading && (
          <span
            className="input-btn"
            role="button"
            tabIndex={0}
            onClick={onCancel}
            style={{ marginRight: 10 }}
            title="Cancel"
          >
            <IconCancel/>
          </span>
        )
      }
      <span
        className="input-btn"
        onClick={onSave}
        title="Save"
        role="button"
        tabIndex={0}
      >
        {loading ? <IconLoading/> : <IconSave/>}
      </span>
    </>
  );

  if (editMode) {
    let element: JSX.Element | null = null;
    if (type === 'input') {
      element = (
        <div>
          <Input
            autoFocus={true}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                onSave();
              }
            }}
            suffix={editButtons}
            placeholder={placeholder}
          />
        </div>
      );
    } else if (type === 'textarea') {
      element = (
        <div style={{ position: 'relative' }}>
          <TextArea
            ref={(ref) => setTextArea(ref)}
            style={{ paddingRight: textAreaScrollbarWidth + 45 + 11 }}
            rows={7}
            autoFocus={true}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
          />
          <div
            style={{ position: 'absolute', right: textAreaScrollbarWidth + 11, top: '50%', marginTop: -11, zIndex: 2 }}
          >
            {editButtons}
          </div>
        </div>
      );
    } else if (type === 'date') {
      element = (
        <div style={{ position: 'relative' }}>
          <DatePicker
            allowClear={false}
            style={{ width: '100%', paddingRight: 57 }}
            placeholder={placeholder}
            autoFocus={true}
            value={editValue ? dayjs(editValue) : null}
            onChange={(date, dateString) => setEditValue(dateString || '')}
            onBlur={(e) => {
              if (!dayjs(e.target.value, 'YYYY-MM-DD').isValid()) {
                setEditValue('');
              }
            }}
          />
          <div
            style={{ position: 'absolute', right: 11, top: '50%', marginTop: -11, zIndex: 2 }}
          >
            {editButtons}
          </div>
        </div>
      );
    }
    return (<div className="editable-text">{element}</div>);
  }

  return (
    <div
      className="editable-text editable-text-display"
      style={{
        display: 'flex',
        minWidth: 0,
        alignItems: 'center',
        padding: '0 11px',
      }}
    >
      <span className={!initialValue ? 'text-muted' : ''} style={{ paddingTop: 3, paddingBottom: 3 }}>
        {initialValue || valuePlaceholder}
      </span>
      {
        editAble && (
          <Button title="Edit Data" type="link" style={{ padding: 0, marginLeft: 5 }} onClick={() => setEditMode(true)}>
            <IconEdit/>
          </Button>
        )
      }
    </div>
  );
};

export default EditableText;
