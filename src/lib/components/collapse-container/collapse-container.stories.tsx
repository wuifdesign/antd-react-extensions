import React, { PropsWithChildren, useState } from 'react'
import { Meta, Story } from '@storybook/react'
import { CollapseContainer, CollapseContainerProps } from './collapse-container'
import { Button } from '../button'

export default {
  component: CollapseContainer,
  title: 'Components/Collapse Container'
} as Meta

const Template: Story<PropsWithChildren<CollapseContainerProps>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpened)
  return (
    <>
      <Button style={{ marginBottom: 10 }} onClick={() => setIsOpen(!isOpen)}>
        Toggle Content
      </Button>
      <CollapseContainer style={{ border: '1px solid #eee', padding: 10, marginTop: 20 }} isOpened={isOpen}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
      </CollapseContainer>
    </>
  )
}

export const Base = Template.bind({})
Base.args = {
  isOpened: true
}

export const StartClosed = Template.bind({})
StartClosed.args = {
  isOpened: false
}
