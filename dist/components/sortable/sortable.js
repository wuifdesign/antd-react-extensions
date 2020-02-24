import React, { useCallback, useMemo } from 'react';
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import SortableItem from './sortable-item';
import { confirmAction } from '../../lib/confirm-dialogs';

const Sortable = ({
  items,
  onSortEnd,
  getItemKey,
  renderItem,
  needsConfirmation = false,
  confirmationTitle = 'Move Item?',
  confirmationContent = 'Do you really want to move this item?',
  onDelete,
  disabled = false
}) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const keys = useMemo(() => {
    return items.map(item => getItemKey(item));
  }, [items, getItemKey]);
  const getMoveIds = useCallback(event => {
    if (event.over) {
      const oldIndex = keys.indexOf(event.active.id);
      const newIndex = keys.indexOf(event.over.id);

      if (oldIndex !== newIndex) {
        return {
          oldIndex,
          newIndex
        };
      }
    }

    return null;
  }, [keys]);
  const onTriggerDelete = onDelete ? id => {
    const deleteIndex = keys.indexOf(id);
    const newItems = [...items];
    newItems.splice(deleteIndex, 1);
    onDelete({
      index: deleteIndex,
      newItems
    });
  } : undefined;
  return /*#__PURE__*/React.createElement(DndContext, {
    sensors: sensors,
    modifiers: [restrictToVerticalAxis, restrictToWindowEdges],
    collisionDetection: closestCenter,
    cancelDrop: event => {
      const moveIds = getMoveIds(event);

      if (moveIds) {
        return new Promise(resolve => {
          if (needsConfirmation) {
            confirmAction({
              title: confirmationTitle,
              content: confirmationContent,
              okText: 'Move',
              onOk: () => {
                resolve(false);
              },
              onCancel: () => {
                resolve(true);
              }
            });
          } else {
            resolve(false);
          }
        });
      }

      return false;
    },
    onDragEnd: event => {
      const moveIds = getMoveIds(event);

      if (moveIds && onSortEnd) {
        onSortEnd({ ...moveIds,
          newItems: arrayMove(items, moveIds.oldIndex, moveIds.newIndex)
        });
      }
    }
  }, /*#__PURE__*/React.createElement(SortableContext, {
    items: keys,
    strategy: verticalListSortingStrategy
  }, /*#__PURE__*/React.createElement("div", {
    className: "sortable-container"
  }, items.map(item => {
    const key = getItemKey(item);
    return /*#__PURE__*/React.createElement(SortableItem, {
      key: key,
      id: key,
      item: renderItem(item),
      disabled: disabled,
      onDelete: onTriggerDelete
    });
  }))));
};

export default Sortable;