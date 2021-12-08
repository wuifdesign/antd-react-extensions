import React, { useState } from 'react'
import { Button } from 'antd'
import { IconDelete, IconEdit, IconFullscreen } from '../icons'
import { confirmDelete } from '../../utils/confirm-dialogs'
import { ImageModal } from './image-modal'
import { useTranslations } from '../config-provider/use-translations'
import { FCWithoutChildren } from '../../utils'

export type ImagePreviewProps = {
  url: string | undefined | null
  thumbUrl?: string
  size?: number
  style?: React.CSSProperties
  fullscreenButton?: boolean
  hideBackground?: boolean
  onDelete?: () => Promise<unknown>
  onEdit?: () => void
  emptyText?: string
  askForDeleteConfirmation?: boolean
  deleteConfirmText?: string | null
  showFullSizeTitle?: string
  editImageTitle?: string
  deleteImageTitle?: string
}

const buttonsContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: 5,
  right: 5
}

export const ImagePreview: FCWithoutChildren<ImagePreviewProps> = ({
  url,
  thumbUrl = url,
  style,
  onDelete,
  onEdit: triggerEdit,
  size = 100,
  fullscreenButton = true,
  hideBackground = false,
  askForDeleteConfirmation = true
}) => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const translations = useTranslations()

  const triggerDelete = () => {
    if (askForDeleteConfirmation) {
      confirmDelete({
        title: translations.ImagePreview.confirmDeleteText,
        onOk: () => {
          return onDelete?.()
        }
      })
    } else {
      onDelete?.()
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: size + 'px',
        height: size + 'px',
        maxWidth: size + 'px',
        flexShrink: 0,
        ...style
      }}
      className={hideBackground ? undefined : 'transparent-bg'}
    >
      {thumbUrl ? (
        <img
          src={thumbUrl}
          alt={thumbUrl}
          style={{
            display: 'block',
            borderRadius: '2px',
            objectFit: 'scale-down',
            width: size + 'px',
            height: size + 'px'
          }}
        />
      ) : (
        <div
          style={{
            height: '100%',
            display: 'flex',
            color: '#999',
            justifyContent: 'center',
            alignItems: 'center',
            letterSpacing: 0.5
          }}
        >
          {translations.ImagePreview.emptyText}
        </div>
      )}
      <div style={buttonsContainerStyle}>
        {fullscreenButton && url && (
          <Button
            type="primary"
            shape="circle"
            title={translations.ImagePreview.btnFullSizeTitle}
            size="small"
            onClick={() => setPreviewVisible(true)}
          >
            <IconFullscreen />
          </Button>
        )}
        {triggerEdit && (
          <Button
            onClick={triggerEdit}
            type="primary"
            shape="circle"
            size="small"
            title={translations.ImagePreview.btnEditImageTitle}
            style={{ marginLeft: 5 }}
          >
            <IconEdit />
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={triggerDelete}
            danger
            shape="circle"
            size="small"
            title={translations.ImagePreview.btnDeleteImageTitle}
            style={{ marginLeft: 5 }}
          >
            <IconDelete />
          </Button>
        )}
      </div>
      {url && <ImageModal visible={previewVisible} imageUrl={url} onClose={() => setPreviewVisible(false)} />}
    </div>
  )
}
