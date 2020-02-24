import React, { useState } from 'react'
import { Button } from 'antd'
import { IconDelete, IconEdit, IconFullscreen } from '../icons'
import { confirmDelete } from '../../lib/confirm-dialogs'
import ImageModal from './image-modal'

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

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  url,
  thumbUrl = url,
  style,
  onDelete,
  onEdit,
  size = 100,
  fullscreenButton = true,
  hideBackground = false,
  askForDeleteConfirmation = true,
  emptyText = 'No Image',
  deleteConfirmText = 'Do you really want to delete this image?',
  showFullSizeTitle = 'Show Full Size',
  editImageTitle = 'Edit Image',
  deleteImageTitle = 'Delete Image'
}) => {
  const [previewVisible, setPreviewVisible] = useState(false)

  const triggerDelete = () => {
    if (onDelete) {
      if (askForDeleteConfirmation) {
        confirmDelete({
          title: deleteConfirmText,
          onOk: () => {
            return onDelete()
          }
        })
      } else {
        onDelete()
      }
    }
  }

  const triggerEdit = () => {
    if (onEdit) {
      onEdit()
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
          {emptyText}
        </div>
      )}
      <div style={buttonsContainerStyle}>
        {fullscreenButton && url && (
          <Button
            type="primary"
            shape="circle"
            title={showFullSizeTitle}
            size="small"
            onClick={() => setPreviewVisible(true)}
          >
            <IconFullscreen />
          </Button>
        )}
        {onEdit && (
          <Button
            onClick={triggerEdit}
            type="primary"
            shape="circle"
            size="small"
            title={editImageTitle}
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
            title={deleteImageTitle}
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

export default ImagePreview
