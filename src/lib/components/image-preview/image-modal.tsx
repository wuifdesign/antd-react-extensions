import React from 'react'
import { Modal } from 'antd'

export type ImageModalProps = {
  visible: boolean
  imageUrl: string
  onClose: () => void
}

export const ImageModal: React.FC<ImageModalProps> = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal
      width={900}
      destroyOnClose
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      className="image-modal"
      visible={visible}
      footer={null}
      onCancel={() => onClose()}
    >
      <img
        alt={imageUrl}
        style={{ maxWidth: '100%', maxHeight: '70vh', display: 'block', margin: '0 auto' }}
        src={imageUrl}
      />
    </Modal>
  )
}

export default ImageModal
