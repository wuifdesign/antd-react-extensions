import { useEffect, useMemo, useRef, useState } from 'react'
import { AdvancedTableHandles, AdvancedTableProps, InnerAdvancedTableProps } from '../advanced-table'
import { AdvancedTableStore, AdvancedTableStoreType } from './advanced-table-store'
import { v4 as generateUniqueID } from 'uuid'

type UseAdvancedTableReturnType = {
  filterValues: any
  currentPage: number
  pageSize: number
  tableProps: (props: AdvancedTableProps) => InnerAdvancedTableProps
}

export const useAdvancedTable = (
  options: {
    cacheKey?: string
    /** Cache current page/page size/filters to cache (cleared after refresh) */
    cacheState?: boolean
    /** Cache page size/settings to local storage */
    preserveToLocalStorage?: boolean
    defaultState?: {
      pageSize?: number
      currentPage?: number
      filterValues?: any
    }
  } = {}
) => {
  const randomCacheKey = useMemo(() => generateUniqueID(), [])
  const { cacheKey: defaultCacheKey } = options
  const { cacheKey = randomCacheKey, cacheState, preserveToLocalStorage, defaultState } = options
  const cacheSettings = { cacheState, preserveToLocalStorage }

  if (!defaultCacheKey && (cacheState || preserveToLocalStorage)) {
    throw new Error('If you want to use "preserveState" or "preserveToLocalStorage" you need to define a "cacheKey".')
  }

  const tableRef = useRef<AdvancedTableHandles>()
  const [settings, setSettings] = useState<AdvancedTableStoreType>(() =>
    AdvancedTableStore.get(cacheKey!, { preserveToLocalStorage })
  )

  useEffect(() => {
    if (settings.filterValues) {
      tableRef.current?.setFilters(settings.filterValues)
    }
  }, [settings.filterValues])

  const filterValues = settings.filterValues || defaultState?.filterValues
  const currentPage = settings.currentPage || defaultState?.currentPage || 1
  const pageSize = settings.pageSize || defaultState?.pageSize || 10

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
    }: Omit<AdvancedTableProps, 'cacheKey' | 'preserveState' | 'preserveToLocalStorage'>) => ({
      ref: tableRef,
      cacheKey,
      isGeneratedCacheKey: !defaultCacheKey,
      cacheState,
      preserveToLocalStorage,
      initialFilterValues: defaultState?.filterValues,
      filterDefaultVisible: settings.filterValues ? true : filterDefaultVisible,
      onFilterSubmit: (values) => {
        setSettings(AdvancedTableStore.store(cacheKey!, { filterValues: values }, cacheSettings))
        onFilterSubmit?.(values)
      },
      onChange: (pagination, filters, sorter, extra) => {
        setSettings(
          AdvancedTableStore.store(
            cacheKey!,
            { currentPage: pagination.current, pageSize: pagination.pageSize },
            cacheSettings
          )
        )
        onChange?.(pagination, filters, sorter, extra)
      },
      pagination: {
        ...pagination,
        ...pagination,
        current: currentPage,
        pageSize
      },
      ...props
    })
  } as UseAdvancedTableReturnType
}
