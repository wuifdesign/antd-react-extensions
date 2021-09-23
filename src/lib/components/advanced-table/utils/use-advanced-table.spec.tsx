import { useAdvancedTable } from './use-advanced-table'
import { renderHook } from '@testing-library/react-hooks'

const baseCheckProps = {
  ref: {
    current: undefined
  },
  columns: [],
  initialFilterValues: undefined,
  onFilterSubmit: expect.any(Function),
  cacheKey: expect.any(String),
  cacheState: undefined,
  preserveToLocalStorage: undefined,
  isGeneratedCacheKey: true,
  filterDefaultVisible: undefined,
  onChange: expect.any(Function),
  pagination: {
    current: 1,
    pageSize: 10
  }
}

describe('useAdvancedTable', () => {
  it('should return default', () => {
    const { result } = renderHook(() => useAdvancedTable())
    const { tableProps } = result.current
    expect(tableProps({ columns: [] })).toEqual(baseCheckProps)
  })

  it('should override default', () => {
    const { result } = renderHook(() => useAdvancedTable({ defaultState: { currentPage: 5, pageSize: 25 } }))
    const { tableProps } = result.current
    expect(tableProps({ columns: [] })).toEqual({
      ...baseCheckProps,
      pagination: {
        current: 5,
        pageSize: 25
      }
    })
  })

  it('should add props', () => {
    const { result } = renderHook(() => useAdvancedTable({ defaultState: { currentPage: 5, pageSize: 25 } }))
    const { tableProps } = result.current
    expect(tableProps({ columns: [], size: 'middle' })).toEqual({
      ...baseCheckProps,
      size: 'middle',
      pagination: {
        current: 5,
        pageSize: 25
      }
    })
  })

  it('should return cacheKey', () => {
    const { result } = renderHook(() => useAdvancedTable({ cacheKey: 'test' }))
    const { tableProps } = result.current
    expect(tableProps({ columns: [] })).toEqual({
      ...baseCheckProps,
      cacheKey: 'test',
      isGeneratedCacheKey: false
    })
  })

  it('should return initialFilters props', () => {
    const defaultFilters = { name: 'test' }
    const { result } = renderHook(() => useAdvancedTable({ defaultState: { filterValues: defaultFilters } }))
    const { tableProps, filterValues } = result.current
    expect(tableProps({ columns: [] })).toEqual({
      ...baseCheckProps,
      initialFilterValues: defaultFilters
    })
    expect(filterValues).toEqual(defaultFilters)
  })
})
