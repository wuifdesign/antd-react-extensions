import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImagePreviewProps } from '../../image-preview/image-preview'
import { ImagePreview } from '../../image-preview'

const getBase64 = (img: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('error', () => {
      reject(new Error('Failed to load base64 data'))
    })
    reader.addEventListener('load', () => {
      resolve(reader.result as string)
    })
    reader.readAsDataURL(img)
  })
}

export type ImageData = {
  mimeType?: string
  base64?: string
  base64Image?: string
}

export type ImageRemoveData = {
  mimeType: null
  base64: null
  base64Image: null
  remove: true
}

export type InputImageProps = {
  defaultImage?: string
  clearable?: boolean
  onChange?: (value: ImageData | ImageRemoveData) => void
  imagePreviewProps?: Omit<ImagePreviewProps, 'url' | 'size' | 'onDelete' | 'onEdit'>
  texts?: {
    dropWaiting: string
    dropActive: string
  }
}

export const InputImage: React.FC<InputImageProps> = ({
  defaultImage,
  onChange,
  clearable = false,
  imagePreviewProps,
  texts = {
    dropWaiting: "Drag 'n' drop some files here, or click to select files",
    dropActive: 'Drop the files here ...'
  }
}) => {
  const [previewImage, setPreviewImage] = useState(defaultImage)

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles[0]) {
        getBase64(acceptedFiles[0]).then((data) => {
          const split = data.indexOf(';')
          const mimeType: string = data.substring(5, split)
          const base64: string = data.substring(split + ';base64,'.length)
          if (onChange) {
            onChange({ mimeType, base64, base64Image: data })
          }
          setPreviewImage(data)
        })
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false
  })

  const onDelete = () => {
    setPreviewImage(undefined)
    if (onChange) {
      onChange({ mimeType: null, base64: null, base64Image: null, remove: true })
    }
    return Promise.resolve()
  }

  return (
    <div style={{ display: 'flex' }} className="input-image">
      <ImagePreview
        askForDeleteConfirmation={false}
        {...imagePreviewProps}
        url={previewImage}
        size={100}
        onDelete={clearable && previewImage ? onDelete : undefined}
      />
      <div
        className="drop-zone"
        style={{
          height: 100,
          padding: 10,
          marginLeft: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? <div>{texts.dropActive}</div> : <div>{texts.dropWaiting}</div>}
      </div>
    </div>
  )
}

export default InputImage
