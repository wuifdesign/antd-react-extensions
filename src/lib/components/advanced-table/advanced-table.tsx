import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Checkbox, Col, Form, Popover, Row, Space, Table, TableProps } from 'antd'
import {
  ColumnHeightOutlined,
  FileExcelOutlined,
  FilterOutlined,
  ReloadOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { EnhancedButton } from '../enhanced-button'
import { DataDisplay } from '../data-display'
import { ExpandableConfig } from 'rc-table/lib/interface'
import { useIsMobile, useTranslations } from '../config-provider'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import AdvancedTableCsvExport from './components/advanced-table-csv-export'
import { AdvancedTableColumnType } from './types/advanced-table-column.type'
import clsx from 'clsx'
import { FormInstance } from 'antd/es/form'
import { IconUndo } from '../icons'
import { CollapseContainer } from '../collapse-container'
import { AdvancedTableStore, AdvancedTableStoreType } from './utils/advanced-table-store'
import { v4 as generateUniqueID } from 'uuid'

export type InnerAdvancedTableProps<T = any> = Omit<TableProps<T>, 'columns' | 'title'> & {
  title?: string
  columns: AdvancedTableColumnType<T>[]
  renderHiddenColumnsAsExpandable?: boolean
  hideCsvExport?: boolean
  hideRowSizeChanger?: boolean
  hideSettings?: boolean
  cacheKey?: string
  isGeneratedCacheKey?: boolean
  cacheState?: boolean
  preserveToLocalStorage?: boolean
  outlined?: boolean
  filterIcon?: React.ReactNode | null
  reloadIcon?: React.ReactNode | null
  exportFileIcon?: React.ReactNode | null
  columnHeightIcon?: React.ReactNode | null
  settingsIcon?: React.ReactNode | null
  filters?: React.ReactNode
  initialFilterValues?: any
  filterDefaultVisible?: boolean
  onFilterSubmit?: (data: any) => void
  onRefresh?: () => void
  extra?: React.ReactNode
}

export type AdvancedTableProps = Omit<InnerAdvancedTableProps, 'isGeneratedCacheKey'>

export interface AdvancedTableHandles {
  setFilters: (values: any) => void
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
        visible: settings.visibleColumns ? settings.visibleColumns.includes(getKey(column)) : column.visible,
        visibleMobile: settings.visibleColumns ? settings.visibleColumns.includes(getKey(column)) : column.visibleMobile
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

export const AdvancedTable: React.ForwardRefExoticComponent<AdvancedTableProps> = React.forwardRef<
  AdvancedTableHandles,
  InnerAdvancedTableProps
>(
  (
    {
      title,
      cacheKey,
      isGeneratedCacheKey,
      cacheState,
      preserveToLocalStorage,
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
      loading,
      filters,
      filterDefaultVisible,
      onFilterSubmit,
      initialFilterValues,
      hideCsvExport,
      hideRowSizeChanger,
      hideSettings,
      onRefresh,
      pagination,
      ...props
    },
    ref
  ) => {
    if (!isGeneratedCacheKey && !cacheKey && (cacheState || preserveToLocalStorage)) {
      throw new Error('If you want to use "cacheState" or "preserveToLocalStorage" you need to define a "cacheKey".')
    }

    const randomCacheKey = useMemo(() => generateUniqueID(), [])
    if (!cacheKey) {
      isGeneratedCacheKey = true
      cacheKey = randomCacheKey
    }

    const isMobile = useIsMobile()
    const formRef = useRef<FormInstance>(null)
    const [filtersVisible, setFiltersVisible] = useState(filterDefaultVisible || false)
    const translations = useTranslations()
    const [settings, setSettings] = useState<AdvancedTableStoreType | null>(() =>
      AdvancedTableStore.get(cacheKey!, { preserveToLocalStorage })
    )
    const currentSize = settings?.rowSize || size || 'large'

    columns = enhanceColumns(columns, settings, isMobile)

    useImperativeHandle(ref, () => ({
      setFilters: (values: any) => {
        formRef.current?.setFieldsValue(values)
      }
    }))

    useEffect(() => {
      return () => {
        if (isGeneratedCacheKey || !cacheState) {
          AdvancedTableStore.remove(cacheKey!)
        }
      }
    }, [cacheKey, cacheState, isGeneratedCacheKey])

    const changeSettings = (data: AdvancedTableStoreType) => {
      setSettings(AdvancedTableStore.store(cacheKey!, data, { preserveToLocalStorage }))
    }

    const onSizeChange = (size: SizeType) => {
      changeSettings({ rowSize: size })
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
        changeSettings({ visibleColumns: visibleKeys })
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

    return (
      <>
        <div className="advanced-table-header">
          {!!filters && (
            <div className="advanced-table-header-filter-btn">
              <EnhancedButton icon={filterIcon} onClick={() => setFiltersVisible(!filtersVisible)}>
                {filtersVisible ? translations.AdvancedTable.hideFilters : translations.AdvancedTable.showFilters}
              </EnhancedButton>
            </div>
          )}
          {!!title && <div className="advanced-table-header-title">{title}</div>}
          <div className="advanced-table-header-extra">
            {extra}
            <Space style={{ marginLeft: 12 }} size={12}>
              {!!onRefresh && (
                <EnhancedButton
                  type="text-inline"
                  onClick={() => onRefresh()}
                  title={translations.AdvancedTable.reloadTable}
                  icon={reloadIcon}
                />
              )}
              {!hideCsvExport && (
                <AdvancedTableCsvExport
                  btnProps={{ type: 'text-inline', title: translations.AdvancedTable.exportCsv, icon: exportFileIcon }}
                  dataSource={props.dataSource}
                  columns={columns}
                />
              )}
              {!hideRowSizeChanger && (
                <Popover
                  trigger={['click']}
                  placement="bottomRight"
                  arrowPointAtCenter
                  title={
                    <div style={{ textAlign: 'center' }}>
                      <EnhancedButton
                        type="link"
                        onClick={() => changeSettings({ rowSize: undefined })}
                        size="small"
                        block
                      >
                        {translations.AdvancedTable.resetSettings}
                      </EnhancedButton>
                    </div>
                  }
                  content={
                    <>
                      <EnhancedButton
                        block
                        type="text"
                        onClick={() => onSizeChange('large')}
                        disabled={currentSize === 'large'}
                      >
                        {translations.AdvancedTable.large}
                      </EnhancedButton>
                      <EnhancedButton
                        block
                        type="text"
                        onClick={() => onSizeChange('middle')}
                        disabled={currentSize === 'middle'}
                      >
                        {translations.AdvancedTable.medium}
                      </EnhancedButton>
                      <EnhancedButton
                        block
                        type="text"
                        onClick={() => onSizeChange('small')}
                        disabled={currentSize === 'small'}
                      >
                        {translations.AdvancedTable.small}
                      </EnhancedButton>
                    </>
                  }
                >
                  <EnhancedButton
                    type="text-inline"
                    icon={columnHeightIcon}
                    title={translations.AdvancedTable.columnHeight}
                  />
                </Popover>
              )}
              {!hideSettings && (
                <Popover
                  trigger={['click']}
                  placement="bottomRight"
                  arrowPointAtCenter
                  title={
                    <div style={{ textAlign: 'center' }}>
                      <EnhancedButton
                        type="link"
                        onClick={() => changeSettings({ visibleColumns: undefined })}
                        size="small"
                        block
                      >
                        {translations.AdvancedTable.resetSettings}
                      </EnhancedButton>
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
                  <EnhancedButton type="text-inline" icon={settingsIcon} title={translations.AdvancedTable.settings} />
                </Popover>
              )}
            </Space>
          </div>
        </div>
        <CollapseContainer isOpened={filtersVisible}>
          <div className="advanced-table-filters">
            <Form ref={formRef} onFinish={onFilterSubmit} layout="vertical" initialValues={initialFilterValues}>
              <div className="advanced-table-filters-body">{filters}</div>
              <Row>
                <Col style={{ marginRight: 'auto' }}>
                  <EnhancedButton
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
                  </EnhancedButton>
                </Col>
                <Col>
                  <EnhancedButton htmlType="submit" loading={!!loading} icon={filterIcon} type="primary">
                    {translations.AdvancedTable.btnApplyFilters}
                  </EnhancedButton>
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
          scroll={{ x: 'max-content' }}
          columns={columns.filter(({ visible }) => visible)}
          pagination={{
            pageSizeOptions: ['10', '25', '50'],
            size: 'small',
            showSizeChanger: true,
            ...pagination
          }}
          {...props}
        />
      </>
    )
  }
)
