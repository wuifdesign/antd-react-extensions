import React from 'react'
import { Button, ButtonProps } from '../../button'
import { AdvancedTableColumnType } from '../advanced-table-column.type'
import { renderToStaticMarkup } from 'react-dom/server'
import { unparse } from 'papaparse'

export type AdvancedTableCsvExportProps = {
  dataSource: readonly any[] | undefined
  readonly columns: AdvancedTableColumnType<any>[]
  fileName?: string
  btnProps?: ButtonProps
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

const AdvancedTableCsvExport: React.FC<AdvancedTableCsvExportProps> = ({
  dataSource,
  columns,
  fileName = 'table',
  btnProps,
  children
}) => {
  const handleDownloadCSV = React.useCallback(() => {
    if (!dataSource) {
      return
    }

    const fields: string[] = []
    for (const column of columns) {
      if (column.exportable !== false && column.key) {
        fields.push(componentToString(column.title))
      }
    }

    const data: string[][] = []
    let i = 0
    for (const record of dataSource) {
      const rowData: string[] = []
      for (const column of columns) {
        if (column.exportable !== false && column.key) {
          const elementData = column.dataIndex ? record[column.dataIndex as string] : record
          const render = column.renderExport || column.render
          const item = componentToString(render ? render(elementData, record, i) : elementData)
          rowData.push(item)
        }
      }
      data.push(rowData)
      i++
    }

    const csv = unparse({ fields, data })
    const blob = new Blob([csv])
    const a = window.document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.download = `${fileName}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [dataSource, columns, fileName])

  return (
    <>
      <Button onClick={handleDownloadCSV} {...btnProps}>
        {children}
      </Button>
    </>
  )
}

export default AdvancedTableCsvExport
