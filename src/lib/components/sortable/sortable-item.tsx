import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MenuOutlined } from '@ant-design/icons'
import { IconDelete } from '../icons'
import { Button } from '../button'
import { useTranslations } from '../config-provider/use-translations'

export type SortableItemProps = {
  id: string
  item: React.ReactNode
  disabled?: boolean
  bordered?: boolean
  itemStyle?: React.CSSProperties
  onDelete?: (id: string) => void
}

const SortableItem: React.FC<SortableItemProps> = ({ id, item, itemStyle, disabled = false, bordered, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled })
  const translations = useTranslations()
  const classNames = ['sortable-item']

  if (isDragging) {
    classNames.push('dragging')
  }

  if (bordered) {
    classNames.push('bordered')
  }

  if (disabled) {
    classNames.push('disabled')
  }

  const style: React.CSSProperties = {
    ...itemStyle,
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined
  }

  return (
    <div className={classNames.join(' ')} ref={setNodeRef} style={style}>
      {!disabled && (
        <button {...attributes} {...listeners} className="sortable-handle">
          <MenuOutlined />
        </button>
      )}
      <div className="sortable-content">{item}</div>
      {!!onDelete && (
        <Button
          size="small"
          type="link"
          danger
          className="sortable-delete"
          onClick={() => onDelete(id)}
          title={translations.SortableItem.btnDeleteTitle}
        >
          <IconDelete />
        </Button>
      )}
    </div>
  )
}

export default SortableItem
