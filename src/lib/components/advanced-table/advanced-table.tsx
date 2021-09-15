import React, { useRef, useState } from 'react'
import { Checkbox, Col, Form, Popover, Row, Space, Table, TableProps } from 'antd'
import {
  ColumnHeightOutlined,
  FileExcelOutlined,
  FilterOutlined,
  ReloadOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Button } from '../button'
import { DataDisplay } from '../data-display'
import { ExpandableConfig } from 'rc-table/lib/interface'
import { useTranslations } from '../config-provider'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import AdvancedTableCsvExport from './components/advanced-table-csv-export'
import { AdvancedTableColumnType } from './advanced-table-column.type'
import clsx from 'clsx'
import { FormInstance } from 'antd/es/form'
import { IconUndo } from '../icons'
import { CollapseContainer } from '../collapse-container'
import { useIsMobile } from '../../utils'
import { AdvancedTableStore, AdvancedTableStoreKeyType, AdvancedTableStoreType } from './utils/advanced-table-store'

export type AdvancedTableProps<T = any> = Omit<TableProps<T>, 'columns' | 'title'> & {
  title?: string
  columns: AdvancedTableColumnType<T>[]
  renderHiddenColumnsAsExpandable?: boolean
  hideCsvExport?: boolean
  hideSizeChanger?: boolean
  hideSettings?: boolean
  localStorageKey?: string
  outlined?: boolean
  filterIcon?: React.ReactNode | null
  reloadIcon?: React.ReactNode | null
  exportFileIcon?: React.ReactNode | null
  columnHeightIcon?: React.ReactNode | null
  settingsIcon?: React.ReactNode | null
  filters?: React.ReactNode
  filterDefaultVisible?: boolean
  onFilterSubmit?: (data: any) => void
  filterInitialValues?: any
  onRefresh?: () => void
  extra?: React.ReactNode
}

const getKey = (column: AdvancedTableColumnType<any>): string => {
  if (column.key) {
    return String(column.key)
  }
  if (column.dataIndex) {
    return String(column.dataIndex)
  }
  throw new Error('No key or dataIndex defined for column')
}

const enhanceColumns = (
  columns: AdvancedTableColumnType<any>[],
  settings: AdvancedTableStoreType | null,
  isMobile: boolean
) => {
  if (settings) {
    columns = columns.map((column) => {
      return {
        ...column,
        visible: settings.visible ? settings.visible.includes(getKey(column)) : column.visible,
        visibleMobile: settings.visible ? settings.visible.includes(getKey(column)) : column.visible
      }
    })
  }
  return columns.map((column) => {
    let visible = column.visible !== false
    if (isMobile && typeof column.visibleMobile === 'boolean') {
      visible = column.visibleMobile
    }
    return {
      ...column,
      visible
    }
  })
}

export const AdvancedTable: React.FC<AdvancedTableProps> = ({
  title,
  localStorageKey,
  className,
  expandable,
  extra,
  columns,
  renderHiddenColumnsAsExpandable = true,
  filterIcon = <FilterOutlined />,
  reloadIcon = <ReloadOutlined />,
  exportFileIcon = <FileExcelOutlined />,
  columnHeightIcon = <ColumnHeightOutlined />,
  settingsIcon = <SettingOutlined />,
  size,
  outlined = true,
  filters,
  filterDefaultVisible,
  loading,
  onFilterSubmit,
  filterInitialValues,
  hideCsvExport,
  hideSizeChanger,
  hideSettings,
  onRefresh,
  pagination,
  ...props
}) => {
  const isMobile = useIsMobile()
  const formRef = useRef<FormInstance>(null)
  const [filtersVisible, setFiltersVisible] = useState(filterDefaultVisible || false)
  const translations = useTranslations()
  const [settings, setSettings] = useState<AdvancedTableStoreType | null>(() => AdvancedTableStore.get(localStorageKey))
  columns = enhanceColumns(columns, settings, isMobile)

  const changeSettings = (data: AdvancedTableStoreType) => {
    AdvancedTableStore.update(localStorageKey, data)
    if (Object.keys(data).length === 0) {
      setSettings(null)
    } else {
      setSettings(data)
    }
  }

  const resetSettings = (type: AdvancedTableStoreKeyType) => {
    const newSettings = { ...settings }
    delete newSettings[type]
    changeSettings(newSettings)
  }

  const onSizeChange = (size: SizeType) => {
    changeSettings({
      ...settings,
      size
    })
  }

  const onVisibleChange = (column: AdvancedTableColumnType<any> | undefined, visible: boolean) => {
    if (column) {
      const key = getKey(column)
      let visibleKeys = columns.filter(({ visible }) => visible !== false).map(getKey) as React.Key[]
      if (visible) {
        visibleKeys.push(key)
      } else {
        visibleKeys = visibleKeys.filter((vKey) => vKey !== key)
      }
      changeSettings({
        ...settings,
        visible: visibleKeys
      })
    }
  }

  const hiddenColumns = columns.filter(({ visible }) => !visible)
  let expandableConfig: ExpandableConfig<any> | undefined
  if ((hiddenColumns.length && renderHiddenColumnsAsExpandable) || expandable) {
    expandableConfig = {
      ...expandable,
      rowExpandable: (record) =>
        (renderHiddenColumnsAsExpandable && !!hiddenColumns.length) || expandable?.rowExpandable?.(record) || true,
      expandedRowRender: (record, index, indent, expanded) => {
        const dataDisplayElements = hiddenColumns.map(({ title, dataIndex, render }, index) => {
          const elementData = dataIndex ? record[dataIndex as string] : record
          return {
            title,
            content: render ? render(elementData, record, index) : elementData
          }
        })
        return (
          <>
            {renderHiddenColumnsAsExpandable && <DataDisplay elements={dataDisplayElements} />}
            {expandable?.expandedRowRender?.(record, index, indent, expanded)}
          </>
        )
      }
    }
  }

  const currentSize = settings?.size || size || 'large'

  return (
    <>
      <div className="advanced-table-header">
        {!!filters && (
          <div className="advanced-table-header-filter-btn">
            <Button icon={filterIcon} onClick={() => setFiltersVisible(!filtersVisible)}>
              {filtersVisible ? translations.AdvancedTable.hideFilters : translations.AdvancedTable.showFilters}
            </Button>
          </div>
        )}
        {!!title && <div className="advanced-table-header-title">{title}</div>}
        <div className="advanced-table-header-extra">
          {extra}
          <Space style={{ marginLeft: 12 }} size={12}>
            {!!onRefresh && (
              <Button
                asText
                onClick={() => onRefresh()}
                title={translations.AdvancedTable.reloadTable}
                icon={reloadIcon}
              />
            )}
            {!hideCsvExport && (
              <AdvancedTableCsvExport
                btnProps={{ asText: true, title: translations.AdvancedTable.exportCsv, icon: exportFileIcon }}
                dataSource={props.dataSource}
                columns={columns}
              />
            )}
            {!hideSizeChanger && (
              <Popover
                trigger={['click']}
                placement="bottomRight"
                arrowPointAtCenter
                title={
                  <div style={{ textAlign: 'center' }}>
                    <Button type="link" onClick={() => resetSettings('size')} size="small" block>
                      {translations.AdvancedTable.resetSettings}
                    </Button>
                  </div>
                }
                content={
                  <>
                    <Button block type="text" onClick={() => onSizeChange('large')} disabled={currentSize === 'large'}>
                      {translations.AdvancedTable.large}
                    </Button>
                    <Button
                      block
                      type="text"
                      onClick={() => onSizeChange('middle')}
                      disabled={currentSize === 'middle'}
                    >
                      {translations.AdvancedTable.medium}
                    </Button>
                    <Button block type="text" onClick={() => onSizeChange('small')} disabled={currentSize === 'small'}>
                      {translations.AdvancedTable.small}
                    </Button>
                  </>
                }
              >
                <Button asText icon={columnHeightIcon} title={translations.AdvancedTable.columnHeight} />
              </Popover>
            )}
            {!hideSettings && (
              <Popover
                trigger={['click']}
                placement="bottomRight"
                arrowPointAtCenter
                title={
                  <div style={{ textAlign: 'center' }}>
                    <Button type="link" onClick={() => resetSettings('visible')} size="small" block>
                      {translations.AdvancedTable.resetSettings}
                    </Button>
                  </div>
                }
                content={
                  <ul className="advanced-table-row-list">
                    {columns
                      ?.filter(({ editable }) => editable !== false)
                      .map((column, index) => (
                        <li key={getKey(column) || index}>
                          <Checkbox
                            checked={column.visible !== false}
                            onChange={(event) => onVisibleChange(column, event.target.checked)}
                          >
                            {column.title}
                          </Checkbox>
                        </li>
                      ))}
                  </ul>
                }
              >
                <Button asText icon={settingsIcon} title={translations.AdvancedTable.settings} />
              </Popover>
            )}
          </Space>
        </div>
      </div>
      <CollapseContainer isOpened={filtersVisible}>
        <div className="advanced-table-filters">
          <Form ref={formRef} onFinish={onFilterSubmit} layout="vertical" initialValues={filterInitialValues}>
            <div className="advanced-table-filters-body">{filters}</div>
            <Row>
              <Col style={{ marginRight: 'auto' }}>
                <Button
                  disabled={!!loading}
                  type="link"
                  onClick={() => {
                    if (formRef.current) {
                      formRef.current.resetFields()
                      onFilterSubmit?.(formRef.current.getFieldsValue())
                    }
                  }}
                  icon={<IconUndo />}
                >
                  {translations.AdvancedTable.btnResetFilters}
                </Button>
              </Col>
              <Col>
                <Button htmlType="submit" loading={!!loading} icon={filterIcon} type="primary">
                  {translations.AdvancedTable.btnApplyFilters}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </CollapseContainer>
      <Table
        className={clsx(className, 'advanced-table', { 'advanced-table-outlined': outlined })}
        expandable={expandableConfig}
        size={currentSize}
        loading={loading}
        columns={columns.filter(({ visible }) => visible)}
        pagination={{
          defaultPageSize: settings?.pageSize || 10,
          pageSizeOptions: ['10', '25'],
          showTotal: (total) => `${total} items`,
          size: 'small',
          showSizeChanger: true,
          showQuickJumper: false,
          onShowSizeChange: (_, pageSize) => {
            changeSettings({
              ...settings,
              pageSize
            })
          },
          ...pagination
        }}
        {...props}
      />
    </>
  )
}
