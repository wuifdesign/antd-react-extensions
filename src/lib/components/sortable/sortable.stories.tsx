import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { Sortable } from './sortable'

export default {
  component: Sortable,
  title: 'Components/Sortable',
  parameters: { controls: { include: ['needsConfirmation', 'disabled'] } }
} as Meta

export const Base = () => {
  const [items, setItems] = useState([{ name: 'Name 1' }, { name: 'Name 2' }, { name: 'Name 3' }])

  return (
    <Sortable
      items={items}
      getItemKey={(item) => item.name}
      renderItem={(item) => <div>{item.name}</div>}
      onSortEnd={(data) => {
        setItems(data.newItems)
      }}
    />
  )
}

export const WithConfirmation = () => {
  const [items, setItems] = useState([{ name: 'Name 1' }, { name: 'Name 2' }, { name: 'Name 3' }])

  return (
    <Sortable
      items={items}
      getItemKey={(item) => item.name}
      renderItem={(item) => <div>{item.name}</div>}
      onSortEnd={(data) => {
        setItems(data.newItems)
      }}
      needsConfirmation={true}
    />
  )
}

export const Disabled = () => {
  const [items, setItems] = useState([{ name: 'Name 1' }, { name: 'Name 2' }, { name: 'Name 3' }])

  return (
    <Sortable
      items={items}
      getItemKey={(item) => item.name}
      renderItem={(item) => <div>{item.name}</div>}
      onSortEnd={(data) => {
        setItems(data.newItems)
      }}
      disabled={true}
    />
  )
}

export const WithDelete = () => {
  const [items, setItems] = useState([{ name: 'Name 1' }, { name: 'Name 2' }, { name: 'Name 3' }])

  return (
    <Sortable
      items={items}
      getItemKey={(item) => item.name}
      renderItem={(item) => <div>{item.name}</div>}
      onSortEnd={({ newItems }) => {
        setItems(newItems)
      }}
      onDelete={({ newItems }) => setItems(newItems)}
    />
  )
}
