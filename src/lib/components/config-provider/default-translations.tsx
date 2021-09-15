type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export const defaultTranslations = {
  LayoutFullPageLoading: {
    tip: 'Loading...'
  },
  ErrorPage: {
    403: {
      title: '403',
      description: 'Sorry, you are not authorized to access this page.'
    },
    404: {
      title: '404',
      description: 'Sorry, the page you visited does not exist.'
    },
    500: {
      title: '500',
      description: 'Sorry, something went wrong please try again.'
    }
  },
  Editable: {
    btnEditTitle: 'Edit Data',
    btnSaveTitle: 'Save',
    btnCancelTitle: 'Cancel'
  },
  FormOverlay: {
    btnSave: 'Save',
    btnCancel: 'Cancel',
    btnReset: 'Reset'
  },
  ImagePreview: {
    emptyText: 'No Image',
    confirmDeleteText: 'Do you really want to delete this image?',
    btnFullSizeTitle: 'Show Full Size',
    btnEditImageTitle: 'Edit Image',
    btnDeleteImageTitle: 'Delete Image'
  },
  InputImage: {
    dropWaiting: "Drag 'n' drop some files here, or click to select files",
    dropActive: 'Drop the files here ...'
  },
  SortableItem: {
    btnDeleteTitle: 'Delete'
  },
  confirmDelete: {
    okText: 'Delete',
    content: 'This action cannot be undone.'
  },
  AdvancedTable: {
    perPage: '/ page',
    showFilters: 'Show Filters',
    hideFilters: 'Hide Filters',
    btnApplyFilters: 'Apply Filters',
    btnResetFilters: 'Reset Filter',
    reloadTable: 'Reload Table',
    exportCsv: 'Export CSV',
    columnHeight: 'Column Height',
    settings: 'Settings',
    resetSettings: 'Reset',
    large: 'Large',
    medium: 'Medium',
    small: 'Small'
  },
  confirmAction: {
    okText: 'Continue',
    content: 'Do you want to continue?'
  }
}

export type TranslationsType = typeof defaultTranslations

export type PartialTranslationsType = DeepPartial<TranslationsType>
