import React from 'react'
import { Meta } from '@storybook/react'
import ThemeWrapper from './theme-wrapper'
import { useTheme } from './theme-context'

export default {
  component: ThemeWrapper,
  title: 'Components/Theme Wrapper',
  parameters: { controls: { include: ['needsConfirmation', 'disabled'] } }
} as Meta

export const Base = () => {
  const Content = () => {
    const { setCssVariables } = useTheme()
    return <button onClick={() => setCssVariables({ '--primary-color': '#a00' })}>Change Background Color</button>
  }
  return (
    <ThemeWrapper>
      <div style={{ background: 'var(--primary-color)' }}>This background changes</div>
      <Content />
    </ThemeWrapper>
  )
}

export const CssOverride = () => {
  const Content = () => {
    const { setCss } = useTheme()
    return <button onClick={() => setCss('.test { color: #a00 }')}>Change Text Color</button>
  }
  return (
    <ThemeWrapper>
      <div className="test">This text color changes</div>
      <Content />
    </ThemeWrapper>
  )
}
