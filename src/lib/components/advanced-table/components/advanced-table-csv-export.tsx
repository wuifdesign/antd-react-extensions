import React from 'react'
import { EnhancedButton, EnhancedButtonProps } from '../../enhanced-button'
import { AdvancedTableColumnType } from '../types/advanced-table-column.type'
import { renderToStaticMarkup } from 'react-dom/server'

export type AdvancedTableCsvExportProps = {
  dataSource: readonly any[] | undefined
  readonly columns: AdvancedTableColumnType<any>[]
  fileName?: string
  btnProps?: EnhancedButtonProps
}

const componentToString = (value: any) => {
  if (typeof value === 'string') {
    return value
  }
  if (value) {
    return renderToStaticMarkup(value)
      .replace(/(<([^>]+)>)/gi, ' ')
      .replace(/  +/g, ' ')
      .trim()
  }
  return ''
}

const handleDownloadCSV = (dataSource: any, columns: AdvancedTableColumnType<any>[], fileName: string) => {
  if (!dataSource) {
    return
  }

  const fields: string[] = []
  for (const column of columns) {
    if (column.exportable !== false && (column.key || column.dataIndex)) {
      fields.push(componentToString(column.title))
    }
  }

  const data: string[][] = []
  let i = 0
  for (const record of dataSource) {
    const rowData: string[] = []
    for (const column of columns) {
      if (column.exportable !== false && (column.key || column.dataIndex)) {
        const elementData = column.dataIndex ? record[column.dataIndex as string] : record
        const render = column.renderExport || column.render
        const item = componentToString(render ? render(elementData, record, i) : elementData)
        rowData.push(item)
      }
    }
    data.push(rowData)
    i++
  }

  import('papaparse').then(({ unparse }) => {
    const csv = unparse({ fields, data })
    const blob = new Blob([csv])
    const a = window.document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.download = `${fileName}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })
}

const AdvancedTableCsvExport: React.FC<AdvancedTableCsvExportProps> = ({
  dataSource,
  columns,
  fileName = 'table',
  btnProps,
  children
}) => (
  <EnhancedButton onClick={() => handleDownloadCSV(dataSource, columns, fileName)} {...btnProps}>
    {children}
  </EnhancedButton>
)

export default AdvancedTableCsvExport
