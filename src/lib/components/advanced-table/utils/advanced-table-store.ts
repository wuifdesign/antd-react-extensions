import React from 'react'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

export type AdvancedTableStoreType = {
  pageSize?: number
  size?: SizeType
  visible?: React.Key[]
}

export type AdvancedTableStoreKeyType = keyof AdvancedTableStoreType

const get = (key: string | undefined): AdvancedTableStoreType | null => {
  const item = key ? window.localStorage.getItem(key) : null
  return item ? JSON.parse(item) : null
}

const store = (key: string | undefined, data: AdvancedTableStoreType) => {
  if (key) {
    window.localStorage.setItem(key, JSON.stringify(data))
  }
}

const remove = (key: string | undefined) => {
  if (key) {
    window.localStorage.removeItem(key)
  }
}

const update = (key: string | undefined, data: AdvancedTableStoreType) => {
  if (key) {
    if (data && Object.keys(data).length > 0) {
      store(key, data)
    } else {
      remove(key)
    }
    return get(key)
  }
}

export const AdvancedTableStore = {
  get,
  store,
  remove,
  update
}
