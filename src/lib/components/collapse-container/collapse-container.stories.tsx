import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { CollapseContainer } from './collapse-container'
import { Button } from '../button'

export default {
  component: CollapseContainer,
  title: 'Components/Collapse Container'
} as Meta

export const Base = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Button style={{ marginBottom: 10 }} onClick={() => setIsOpen(!isOpen)}>
        Toggle Content
      </Button>
      <CollapseContainer isOpened={isOpen} style={{ border: '1px solid #eee', padding: 10 }}>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </CollapseContainer>
    </>
  )
}
