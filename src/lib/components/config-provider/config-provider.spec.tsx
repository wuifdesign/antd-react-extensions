import React, { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import { ConfigProvider, useTheme } from './index'
import useTranslations from './use-translations'

const TranslationConsumer: React.FC = () => {
  const translations = useTranslations()
  return <>{translations.ImagePreview.emptyText}</>
}

describe('ConfigProvider', () => {
  it('should render', () => {
    render(<ConfigProvider>ButtonText</ConfigProvider>)
  })

  it('should pass translations', () => {
    render(
      <ConfigProvider>
        <TranslationConsumer />
      </ConfigProvider>
    )
    const text = screen.getByText(/No Image/i)
    expect(text).toBeInTheDocument()
  })

  it('should override translations', () => {
    render(
      <ConfigProvider translations={{ ImagePreview: { emptyText: 'Custom Empty Text' } }}>
        <TranslationConsumer />
      </ConfigProvider>
    )
    const text = screen.getByText(/Custom Empty Text/i)
    expect(text).toBeInTheDocument()
  })

  it('should shows content', () => {
    render(<ConfigProvider>LayoutContent</ConfigProvider>)
    const text = screen.getByText(/LayoutContent/i)
    expect(text).toBeInTheDocument()
  })

  it('should updates css variables', () => {
    const TestComp = () => {
      const { setCssVariables } = useTheme()

      useEffect(() => {
        setCssVariables({ '--testVar': '#000', '--testVar2': '#A00' })
      }, [setCssVariables])

      return null
    }

    const { container } = render(
      <ConfigProvider>
        <TestComp />
      </ConfigProvider>
    )

    const styleContent = container.querySelector('style')?.innerHTML
    expect(styleContent).toBe(':root {--testVar:#000;--testVar2:#A00}')
  })

  it('should updates css', () => {
    const TestComp = () => {
      const { setCss } = useTheme()

      useEffect(() => {
        setCss(`body { color: '#000' }`)
      }, [setCss])

      return null
    }

    const { container } = render(
      <ConfigProvider>
        <TestComp />
      </ConfigProvider>
    )

    const styleContent = container.querySelector('style')?.innerHTML
    expect(styleContent).toBe(`body { color: '#000' }`)
  })
})
