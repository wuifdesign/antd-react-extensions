import { useAdvancedTable } from './use-advanced-table'
import { renderHook } from '@testing-library/react-hooks'

describe('useAdvancedTable', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useAdvancedTable())
    const { tableProps } = result.current
    expect(tableProps({ columns: [] })).toEqual({
      ref: {
        current: undefined
      },
      columns: [],
      initialFilterValues: undefined,
      onFilterSubmit: expect.any(Function),
      cacheKey: expect.any(String),
      filterDefaultVisible: undefined,
      onChange: expect.any(Function),
      pagination: {
        current: 1,
        pageSize: 10
      }
    })
  })

  it('should override default', () => {
    const { result } = renderHook(() => useAdvancedTable(undefined, { defaultCurrent: 5, defaultPageSize: 25 }))
    const { tableProps } = result.current
    expect(tableProps({ columns: [] })).toEqual({
      ref: {
        current: undefined
      },
      columns: [],
      initialFilterValues: undefined,
      onFilterSubmit: expect.any(Function),
      cacheKey: expect.any(String),
      filterDefaultVisible: undefined,
      onChange: expect.any(Function),
      pagination: {
        current: 5,
        pageSize: 25
      }
    })
  })

  it('should add props', () => {
    const { result } = renderHook(() => useAdvancedTable(undefined, { defaultCurrent: 5, defaultPageSize: 25 }))
    const { tableProps } = result.current
    expect(tableProps({ columns: [], size: 'middle' })).toEqual({
      ref: {
        current: undefined
      },
      columns: [],
      initialFilterValues: undefined,
      onFilterSubmit: expect.any(Function),
      cacheKey: expect.any(String),
      filterDefaultVisible: undefined,
      onChange: expect.any(Function),
      size: 'middle',
      pagination: {
        current: 5,
        pageSize: 25
      }
    })
  })

  it('should return initialFilters props', () => {
    const defaultFilters = { name: 'test' }
    const { result } = renderHook(() => useAdvancedTable(undefined, { initialFilterValues: defaultFilters }))
    const { tableProps, filterValues } = result.current
    expect(tableProps({ columns: [] })).toEqual({
      ref: {
        current: undefined
      },
      columns: [],
      initialFilterValues: defaultFilters,
      onFilterSubmit: expect.any(Function),
      cacheKey: expect.any(String),
      filterDefaultVisible: undefined,
      onChange: expect.any(Function),
      pagination: {
        current: 1,
        pageSize: 10
      }
    })
    expect(filterValues).toEqual(defaultFilters)
  })
})
