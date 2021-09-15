import React from 'react'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

export type AdvancedTableStoreType = {
  pageSize?: number
  rowSize?: SizeType
  visible?: React.Key[]
}

export type AdvancedTableStoreKeyType = keyof AdvancedTableStoreType

const get = (localStorageKey: string | undefined): AdvancedTableStoreType | null => {
  const item = localStorageKey ? window.localStorage.getItem(localStorageKey) : null
  return item ? JSON.parse(item) : null
}

const store = (localStorageKey: string | undefined, data: AdvancedTableStoreType) => {
  if (localStorageKey) {
    window.localStorage.setItem(localStorageKey, JSON.stringify(data))
  }
}

const removeFromLocalStorage = (localStorageKey: string | undefined) => {
  if (localStorageKey) {
    window.localStorage.removeItem(localStorageKey)
  }
}

const update = (
  localStorageKey: string | undefined,
  data: Partial<AdvancedTableStoreType> | null,
  removeKey?: AdvancedTableStoreKeyType
) => {
  if (localStorageKey) {
    const temp = { ...get(localStorageKey), ...data }
    if (removeKey) {
      delete temp[removeKey]
    }
    if (temp && Object.keys(temp).length > 0) {
      store(localStorageKey, temp)
    } else {
      removeFromLocalStorage(localStorageKey)
    }
  }
  return get(localStorageKey)
}

export const AdvancedTableStore = {
  get,
  update
}
