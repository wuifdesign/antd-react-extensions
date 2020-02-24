import React, { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import ThemeWrapper from './theme-wrapper'
import { useTheme } from './theme-context'

describe('ThemeWrapper', () => {
  it('should render', () => {
    render(<ThemeWrapper>ButtonText</ThemeWrapper>)
  })

  it('should shows content', () => {
    render(<ThemeWrapper>LayoutContent</ThemeWrapper>)
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
      <ThemeWrapper>
        <TestComp />
      </ThemeWrapper>
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
      <ThemeWrapper>
        <TestComp />
      </ThemeWrapper>
    )

    const styleContent = container.querySelector('style')?.innerHTML
    expect(styleContent).toBe(`body { color: '#000' }`)
  })
})
