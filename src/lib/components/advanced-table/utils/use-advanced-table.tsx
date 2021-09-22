import { useEffect, useRef, useState } from 'react'
import { AdvancedTableHandles, AdvancedTableProps } from '../advanced-table'
import { AdvancedTableStore, AdvancedTableStoreType } from './advanced-table-store'
import { v4 as generateUniqueID } from 'uuid'

type UseAdvancedTableReturnType = {
  filterValues: any
  currentPage: number
  pageSize: number
  tableProps: (props: AdvancedTableProps) => AdvancedTableProps
}

let advancedTableCache: Record<string, { filterValues?: any; currentPage?: number; currentPageSize?: number }> = {}

/**
 * if no key is provided all data will be cleared
 */
export const clearAdvancedTableCache = (key?: string) => {
  if (key) {
    delete advancedTableCache[key]
  } else {
    advancedTableCache = {}
  }
}

export const useAdvancedTable = (
  stateCacheKey?: string,
  options: {
    cacheKey?: string
    useLocalStorage?: boolean
    defaultPageSize?: number
    defaultCurrent?: number
    initialFilterValues?: any
    cacheFilterValues?: boolean
    cacheCurrentPage?: boolean
  } = {}
) => {
  const {
    cacheKey = generateUniqueID(),
    useLocalStorage,
    defaultPageSize,
    defaultCurrent,
    initialFilterValues,
    cacheFilterValues = true,
    cacheCurrentPage = true
  } = options
  const tableRef = useRef<AdvancedTableHandles>()
  const [settings] = useState<AdvancedTableStoreType | null>(() => AdvancedTableStore.get(cacheKey, useLocalStorage))
  const [currentPage, setCurrentPage] = useState(() => {
    if (stateCacheKey && advancedTableCache[stateCacheKey]?.currentPage) {
      return advancedTableCache[stateCacheKey].currentPage
    }
    return defaultCurrent || 1
  })
  const [pageSize, setPageSize] = useState(() => {
    if (stateCacheKey && advancedTableCache[stateCacheKey]?.currentPageSize) {
      return advancedTableCache[stateCacheKey].currentPageSize
    }
    return settings?.pageSize || defaultPageSize || 10
  })
  const [filterValues, setFilterValues] = useState(() => {
    if (stateCacheKey && advancedTableCache[stateCacheKey]?.filterValues) {
      return advancedTableCache[stateCacheKey].filterValues
    }
    return initialFilterValues
  })

  useEffect(() => {
    if (stateCacheKey && advancedTableCache[stateCacheKey] && cacheFilterValues) {
      tableRef.current?.setFilters(advancedTableCache[stateCacheKey].filterValues)
    }
  }, [stateCacheKey, cacheFilterValues])

  return {
    tableRef,
    filterValues,
    currentPage,
    pageSize,
    tableProps: ({
      pagination,
      onChange,
      onFilterSubmit,
      filterDefaultVisible,
      ...props
    }: Omit<AdvancedTableProps, 'cacheKey'>) => ({
      ref: tableRef,
      cacheKey,
      useLocalStorage,
      initialFilterValues: initialFilterValues,
      filterDefaultVisible:
        stateCacheKey && advancedTableCache[stateCacheKey]?.filterValues ? true : filterDefaultVisible,
      onFilterSubmit: (values) => {
        if (stateCacheKey && cacheFilterValues) {
          advancedTableCache[stateCacheKey] = { ...advancedTableCache[stateCacheKey], filterValues: values }
        }
        setFilterValues(values)
        onFilterSubmit?.(values)
      },
      onChange: (pagination, filters, sorter, extra) => {
        if (pagination.current) {
          if (stateCacheKey && cacheCurrentPage) {
            advancedTableCache[stateCacheKey] = {
              ...advancedTableCache[stateCacheKey],
              currentPage: pagination.current
            }
          }
          setCurrentPage(pagination.current)
        }
        if (pagination.pageSize) {
          if (stateCacheKey && cacheCurrentPage) {
            advancedTableCache[stateCacheKey] = {
              ...advancedTableCache[stateCacheKey],
              currentPageSize: pagination.pageSize
            }
          }
          setPageSize(pagination.pageSize)
          AdvancedTableStore.update(cacheKey, useLocalStorage, { pageSize: pagination.pageSize })
        }
        onChange?.(pagination, filters, sorter, extra)
      },
      pagination: {
        ...pagination,
        current: currentPage,
        pageSize
      },
      ...props
    })
  } as UseAdvancedTableReturnType
}
