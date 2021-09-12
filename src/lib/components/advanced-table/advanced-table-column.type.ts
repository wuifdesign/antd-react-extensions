import { ColumnType } from 'antd/lib/table'

export type AdvancedTableColumnType<T> = ColumnType<T> & {
  visible?: boolean
  visibleMobile?: boolean
  editable?: boolean
  exportable?: boolean
  renderExport?: (value: any, record: T, index: number) => string
}
