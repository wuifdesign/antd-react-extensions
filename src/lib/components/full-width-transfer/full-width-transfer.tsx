import React from 'react'
import { Transfer, TransferProps } from 'antd'
import { TransferItem } from 'antd/lib/transfer'

export const FullWidthTransfer = <RecordType extends TransferItem = TransferItem>(
  props: Partial<TransferProps<RecordType>>
) => {
  return (
    <Transfer
      className="full-width-transfer ant-transfer-customized-list"
      showSearch
      render={(item) => item.title || ''}
      {...props}
    />
  )
}
