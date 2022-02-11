type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export const defaultTranslations = {
  LayoutFullPageLoading: {
    tip: 'Loading...'
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
