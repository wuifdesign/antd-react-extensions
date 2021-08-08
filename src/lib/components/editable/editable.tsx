import React, { useCallback, useState } from 'react'
import { Button } from 'antd'
import { IconCancel, IconEdit, IconLoading, IconSave } from '../icons'
import useTranslations from '../config-provider/use-translations'

export type EditableProps = {
  onSubmit?: (value: any) => Promise<void>
  value?: any
  valuePlaceholder?: string
  editAble?: boolean
  style?: React.CSSProperties
}

export type BaseEditableProps = EditableProps & {
  valueDisplay?: (value: any) => React.ReactNode | undefined
  onStartEdit?: () => any
  onExitEdit?: () => any
  editElement: (
    buttons: (saveHandler?: () => any) => React.ReactNode,
    triggerSubmit: (value: any) => any
  ) => React.ReactNode
}

const Editable: React.FC<BaseEditableProps> = ({
  value,
  valuePlaceholder = '-',
  editAble = true,
  style,
  onSubmit,
  valueDisplay = (value) => value,
  editElement,
  onStartEdit,
  onExitEdit
}) => {
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const translations = useTranslations()

  const onInitEdit = useCallback(() => {
    setEditMode(true)
    if (onStartEdit) {
      onStartEdit()
    }
  }, [onStartEdit])

  const onFinishEdit = useCallback(() => {
    if (onExitEdit) {
      onExitEdit()
    }
    setEditMode(false)
  }, [onExitEdit])

  const onCancel = useCallback(() => {
    onFinishEdit()
  }, [onFinishEdit])

  const onSave = useCallback(
    (newValue: number | string) => {
      if (loading) {
        return
      }
      if (newValue !== value) {
        if (onSubmit) {
          setLoading(true)
          onSubmit(newValue)
            .then((formValue) => {
              onFinishEdit()
              return formValue
            })
            .finally(() => {
              setLoading(false)
            })
        } else {
          onFinishEdit()
        }
      } else {
        onFinishEdit()
      }
    },
    [onSubmit, value, onFinishEdit, loading]
  )

  const editButtons = useCallback(
    (saveHandler?: () => any) => (
      <>
        {loading ? (
          <>{loading ? <IconLoading /> : <IconSave />}</>
        ) : (
          <>
            <button className="editable-btn" onClick={onCancel} title={translations.Editable.btnCancelTitle}>
              <IconCancel />
            </button>
            {!!saveHandler && (
              <button
                className="editable-btn"
                style={{ marginLeft: 10 }}
                onClick={saveHandler}
                title={translations.Editable.btnSaveTitle}
              >
                <IconSave />
              </button>
            )}
          </>
        )}
      </>
    ),
    [loading, onCancel, translations]
  )

  if (editMode) {
    return <div className="editable editable-input">{editElement(editButtons, onSave)}</div>
  }

  return (
    <div style={style}>
      <div className="editable editable-display">
        <span className={!value ? 'text-muted' : ''} style={{ paddingTop: 3, paddingBottom: 3 }}>
          {valueDisplay(value) || valuePlaceholder}
        </span>
        {editAble && (
          <Button
            title={translations.Editable.btnEditTitle}
            type="link"
            style={{ padding: 0, marginLeft: 5 }}
            onClick={onInitEdit}
          >
            <IconEdit />
          </Button>
        )}
      </div>
    </div>
  )
}

export default Editable
