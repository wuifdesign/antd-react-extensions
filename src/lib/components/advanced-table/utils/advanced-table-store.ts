import React from 'react'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

export type AdvancedTableStoreSettingsType = {
  preserveToLocalStorage?: boolean
}

export type AdvancedTableStoreType = {
  filterValues?: any
  currentPage?: number
  pageSize?: number
  rowSize?: SizeType
  visibleColumns?: React.Key[]
}
export type AdvancedTableStoreKeyType = keyof AdvancedTableStoreType

const cachedSettings: Record<string, AdvancedTableStoreType> = {}

const filterUndefined = (values: AdvancedTableStoreType) => {
  const data: AdvancedTableStoreType = {}
  for (const [key, value] of Object.entries(values)) {
    if (typeof values !== 'undefined') {
      data[key as AdvancedTableStoreKeyType] = value
    }
  }
  return data
}

const filterValues = (values: AdvancedTableStoreType, keys: AdvancedTableStoreKeyType[]) => {
  const data: AdvancedTableStoreType = {}
  for (const [key, value] of Object.entries(values)) {
    if (keys.includes(key as any)) {
      data[key as AdvancedTableStoreKeyType] = value
    }
  }
  return data
}

const writeToLocalStorage = (cacheKey: string, data: AdvancedTableStoreType) => {
  const filteredData = filterValues(data, ['pageSize', 'visibleColumns', 'rowSize'])
  if (Object.keys(filteredData).length) {
    window.localStorage.setItem(cacheKey, JSON.stringify(filteredData))
  } else {
    window.localStorage.removeItem(cacheKey)
  }
}

const writeToTempCache = (cacheKey: string, data: AdvancedTableStoreType) => {
  if (Object.keys(data).length) {
    cachedSettings[cacheKey] = data
  } else {
    delete cachedSettings[cacheKey]
  }
}

const get = (cacheKey: string, { preserveToLocalStorage }: AdvancedTableStoreSettingsType): AdvancedTableStoreType => {
  let data: AdvancedTableStoreType = {}
  if (preserveToLocalStorage) {
    data = {
      ...data,
      ...(typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(cacheKey) || '{}') : {})
    }
  }
  return {
    ...data,
    ...cachedSettings[cacheKey]
  }
}

const store = (cacheKey: string, data: AdvancedTableStoreType, settings: AdvancedTableStoreSettingsType) => {
  const filteredData = filterUndefined({ ...get(cacheKey, settings), ...data })
  if (settings.preserveToLocalStorage) {
    writeToLocalStorage(cacheKey, filteredData)
  }
  writeToTempCache(cacheKey, filteredData)
  return filteredData
}

const remove = (cacheKey: string, removeFromLocalStorage?: boolean) => {
  delete cachedSettings[cacheKey]
  if (removeFromLocalStorage) {
    window.localStorage.removeItem(cacheKey)
  }
}

export const AdvancedTableStore = {
  remove,
  get,
  store
}
