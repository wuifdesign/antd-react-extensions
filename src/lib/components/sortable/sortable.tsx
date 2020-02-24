import React, { useCallback, useMemo } from 'react'
import { closestCenter, DndContext, MouseSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'
import SortableItem from './sortable-item'
import { confirmAction } from '../../lib/confirm-dialogs'
import { CancelDropArguments } from '@dnd-kit/core/dist/components/DndContext/DndContext'
import { DragEndEvent } from '@dnd-kit/core/dist/types'

export type SortEndCallback<T extends any> = (data: { newIndex: number; oldIndex: number; newItems: T[] }) => void
export type DeleteCallback<T extends any> = (data: { index: number; newItems: T[] }) => void

export type SortableProps<T extends any> = {
  items: T[]
  getItemKey: (item: T) => string
  renderItem: (item: T) => React.ReactNode
  needsConfirmation?: boolean
  confirmationTitle?: React.ReactNode
  confirmationContent?: React.ReactNode
  onSortEnd?: SortEndCallback<T>
  onDelete?: DeleteCallback<T>
  itemStyle?: React.CSSProperties
  disabled?: boolean
}

const Sortable = <T,>({
  items,
  onSortEnd,
  getItemKey,
  renderItem,
  needsConfirmation = false,
  confirmationTitle = 'Move Item?',
  confirmationContent = 'Do you really want to move this item?',
  onDelete,
  itemStyle,
  disabled = false
}: SortableProps<T>) => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(MouseSensor))

  const keys = useMemo(() => {
    return items.map((item) => getItemKey(item))
  }, [items, getItemKey])

  const getMoveIds = useCallback(
    (event: CancelDropArguments | DragEndEvent) => {
      if (event.over) {
        const oldIndex = keys.indexOf(event.active.id)
        const newIndex = keys.indexOf(event.over.id)
        if (oldIndex !== newIndex) {
          return { oldIndex, newIndex }
        }
      }
      return null
    },
    [keys]
  )

  const onTriggerDelete = onDelete
    ? (id: string) => {
        const deleteIndex = keys.indexOf(id)
        const newItems = [...items]
        newItems.splice(deleteIndex, 1)
        onDelete({
          index: deleteIndex,
          newItems
        })
      }
    : undefined

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
      collisionDetection={closestCenter}
      cancelDrop={(event) => {
        const moveIds = getMoveIds(event)
        if (moveIds) {
          return new Promise((resolve) => {
            if (needsConfirmation) {
              confirmAction({
                title: confirmationTitle,
                content: confirmationContent,
                okText: 'Move',
                onOk: () => {
                  resolve(false)
                },
                onCancel: () => {
                  resolve(true)
                }
              })
            } else {
              resolve(false)
            }
          })
        }
        return false
      }}
      onDragEnd={(event) => {
        const moveIds = getMoveIds(event)
        if (moveIds && onSortEnd) {
          onSortEnd({ ...moveIds, newItems: arrayMove(items, moveIds.oldIndex, moveIds.newIndex) })
        }
      }}
    >
      <SortableContext items={keys} strategy={verticalListSortingStrategy}>
        <div className="sortable-container">
          {items.map((item) => {
            const key = getItemKey(item)
            return (
              <SortableItem
                key={key}
                id={key}
                item={renderItem(item)}
                disabled={disabled}
                onDelete={onTriggerDelete}
                itemStyle={itemStyle}
              />
            )
          })}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default Sortable
