import React from 'react'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

export type AdvancedTableStoreType = {
  pageSize?: number
  rowSize?: SizeType
  visible?: React.Key[]
}

export type AdvancedTableStoreKeyType = keyof AdvancedTableStoreType

const storedSettings: Record<string, AdvancedTableStoreType> = {}

const removeStoredSetting = (cacheKey: string) => {
  delete storedSettings[cacheKey]
}

const get = (cacheKey: string, useLocalStorage?: boolean): AdvancedTableStoreType | null => {
  let data = storedSettings[cacheKey]
  if (useLocalStorage) {
    const item = window.localStorage.getItem(cacheKey)
    if (item) {
      data = JSON.parse(item)
    }
  }
  return data || null
}

const store = (cacheKey: string, useLocalStorage: boolean, data: AdvancedTableStoreType) => {
  storedSettings[cacheKey] = data
  if (useLocalStorage) {
    window.localStorage.setItem(cacheKey, JSON.stringify(data))
  }
}

const removeFromLocalStorage = (cacheKey: string, useLocalStorage: boolean) => {
  delete storedSettings[cacheKey]
  if (useLocalStorage) {
    window.localStorage.removeItem(cacheKey)
  }
}

const update = (
  cacheKey: string,
  useLocalStorage: boolean = false,
  data: Partial<AdvancedTableStoreType> | null,
  removeKey?: AdvancedTableStoreKeyType
) => {
  const temp = { ...get(cacheKey, useLocalStorage), ...data }
  if (removeKey) {
    delete temp[removeKey]
  }
  if (temp && Object.keys(temp).length > 0) {
    store(cacheKey, useLocalStorage, temp)
  } else {
    removeFromLocalStorage(cacheKey, useLocalStorage)
  }
  return temp
}

export const AdvancedTableStore = {
  removeStoredSetting,
  get,
  update
}
