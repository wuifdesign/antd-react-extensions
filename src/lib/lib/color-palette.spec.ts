import {
  colorPalette,
  getCssVariablesFromColor,
  getFullColorPalette,
  getFullColorPaletteForVariable
} from './color-palette'

describe('colorPalette', () => {
  it('should generate color', () => {
    const check = colorPalette('#1890ff', 1)
    expect(check).toEqual('#e6f7ff')
  })

  it('should generate colors palette', () => {
    const palette = getFullColorPalette('#1890ff', (i: number) => `var(--primary-color-${i})`)
    expect(palette).toStrictEqual({
      '#e6f7ff': 'var(--primary-color-1)',
      '#bae7ff': 'var(--primary-color-2)',
      '#91d5ff': 'var(--primary-color-3)',
      '#69c0ff': 'var(--primary-color-4)',
      '#40a9ff': 'var(--primary-color-5)',
      '#1890ff': 'var(--primary-color-6)',
      '#096dd9': 'var(--primary-color-7)',
      '#0050b3': 'var(--primary-color-8)',
      '#003a8c': 'var(--primary-color-9)',
      '#002766': 'var(--primary-color-10)'
    })
  })

  it('should generate colors palette with selector', () => {
    const palette = getFullColorPalette('#1890ff', (i: number) => `var(--primary-color-${i})`, /.btn/)
    expect(palette).toStrictEqual({
      '#e6f7ff': { value: 'var(--primary-color-1)', selector: /.btn/ },
      '#bae7ff': { value: 'var(--primary-color-2)', selector: /.btn/ },
      '#91d5ff': { value: 'var(--primary-color-3)', selector: /.btn/ },
      '#69c0ff': { value: 'var(--primary-color-4)', selector: /.btn/ },
      '#40a9ff': { value: 'var(--primary-color-5)', selector: /.btn/ },
      '#1890ff': { value: 'var(--primary-color-6)', selector: /.btn/ },
      '#096dd9': { value: 'var(--primary-color-7)', selector: /.btn/ },
      '#0050b3': { value: 'var(--primary-color-8)', selector: /.btn/ },
      '#003a8c': { value: 'var(--primary-color-9)', selector: /.btn/ },
      '#002766': { value: 'var(--primary-color-10)', selector: /.btn/ }
    })
  })

  it('should generate colors palette for variable', () => {
    const palette = getFullColorPaletteForVariable('#1890ff', 'primary-color')
    expect(palette).toStrictEqual({
      '#e6f7ff': 'var(--primary-color-1)',
      '#bae7ff': 'var(--primary-color-2)',
      '#91d5ff': 'var(--primary-color-3)',
      '#69c0ff': 'var(--primary-color-4)',
      '#40a9ff': 'var(--primary-color-5)',
      '#1890ff': 'var(--primary-color)',
      '#096dd9': 'var(--primary-color-7)',
      '#0050b3': 'var(--primary-color-8)',
      '#003a8c': 'var(--primary-color-9)',
      '#002766': 'var(--primary-color-10)'
    })
  })

  it('should generate colors palette for variable with selector', () => {
    const palette = getFullColorPaletteForVariable('#1890ff', 'primary-color', /.btn/)
    expect(palette).toStrictEqual({
      '#e6f7ff': { value: 'var(--primary-color-1)', selector: /.btn/ },
      '#bae7ff': { value: 'var(--primary-color-2)', selector: /.btn/ },
      '#91d5ff': { value: 'var(--primary-color-3)', selector: /.btn/ },
      '#69c0ff': { value: 'var(--primary-color-4)', selector: /.btn/ },
      '#40a9ff': { value: 'var(--primary-color-5)', selector: /.btn/ },
      '#1890ff': { value: 'var(--primary-color)', selector: /.btn/ },
      '#096dd9': { value: 'var(--primary-color-7)', selector: /.btn/ },
      '#0050b3': { value: 'var(--primary-color-8)', selector: /.btn/ },
      '#003a8c': { value: 'var(--primary-color-9)', selector: /.btn/ },
      '#002766': { value: 'var(--primary-color-10)', selector: /.btn/ }
    })
  })

  it('should generate css variables from color', () => {
    const palette = getCssVariablesFromColor('#1890ff', 'primary-color')
    expect(palette).toStrictEqual({
      '--primary-color-1': '#e6f7ff',
      '--primary-color-2': '#bae7ff',
      '--primary-color-3': '#91d5ff',
      '--primary-color-4': '#69c0ff',
      '--primary-color-5': '#40a9ff',
      '--primary-color': '#1890ff',
      '--primary-color-7': '#096dd9',
      '--primary-color-8': '#0050b3',
      '--primary-color-9': '#003a8c',
      '--primary-color-10': '#002766'
    })
  })
})
