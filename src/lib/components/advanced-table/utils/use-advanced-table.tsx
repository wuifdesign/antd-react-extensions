import { useEffect, useRef, useState } from 'react'
import { AdvancedTableHandles, AdvancedTableProps } from '../advanced-table'
import { AdvancedTableStore, AdvancedTableStoreType } from './advanced-table-store'

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
  localStorageKey?: string,
  options: {
    defaultPageSize?: number
    defaultCurrent?: number
    initialFilterValues?: any
    cacheKey?: string
    cacheFilterValues?: boolean
    cacheCurrentPage?: boolean
  } = {}
) => {
  const {
    defaultPageSize,
    defaultCurrent,
    initialFilterValues,
    cacheKey,
    cacheFilterValues = true,
    cacheCurrentPage = true
  } = options
  const tableRef = useRef<AdvancedTableHandles>()
  const [settings] = useState<AdvancedTableStoreType | null>(() => AdvancedTableStore.get(localStorageKey))
  const [currentPage, setCurrentPage] = useState(() => {
    if (cacheKey && advancedTableCache[cacheKey]?.currentPage) {
      return advancedTableCache[cacheKey].currentPage
    }
    return defaultCurrent || 1
  })
  const [pageSize, setPageSize] = useState(() => {
    if (cacheKey && advancedTableCache[cacheKey]?.currentPageSize) {
      return advancedTableCache[cacheKey].currentPageSize
    }
    return settings?.pageSize || defaultPageSize || 10
  })
  const [filterValues, setFilterValues] = useState(() => {
    if (cacheKey && advancedTableCache[cacheKey]?.filterValues) {
      return advancedTableCache[cacheKey].filterValues
    }
    return initialFilterValues
  })

  useEffect(() => {
    if (cacheKey && advancedTableCache[cacheKey] && cacheFilterValues) {
      tableRef.current?.setFilters(advancedTableCache[cacheKey].filterValues)
    }
  }, [cacheKey, cacheFilterValues])

  return {
    tableRef,
    filterValues,
    currentPage,
    pageSize,
    tableProps: ({ pagination, onChange, onFilterSubmit, ...props }: Omit<AdvancedTableProps, 'localStorageKey'>) => ({
      ref: tableRef,
      localStorageKey,
      initialFilterValues: initialFilterValues,
      onFilterSubmit: (values) => {
        if (cacheKey && cacheFilterValues) {
          advancedTableCache[cacheKey] = { ...advancedTableCache[cacheKey], filterValues: values }
        }
        setFilterValues(values)
        onFilterSubmit?.(values)
      },
      onChange: (pagination, filters, sorter, extra) => {
        if (pagination.current) {
          if (cacheKey && cacheCurrentPage) {
            advancedTableCache[cacheKey] = {
              ...advancedTableCache[cacheKey],
              currentPage: pagination.current
            }
          }
          setCurrentPage(pagination.current)
        }
        if (pagination.pageSize) {
          if (cacheKey && cacheCurrentPage) {
            advancedTableCache[cacheKey] = {
              ...advancedTableCache[cacheKey],
              currentPageSize: pagination.pageSize
            }
          }
          setPageSize(pagination.pageSize)
          AdvancedTableStore.update(localStorageKey, { pageSize: pagination.pageSize })
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
