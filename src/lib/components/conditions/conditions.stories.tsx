import React, { PropsWithChildren } from 'react'
import { Meta, Story } from '@storybook/react'
import { If, IfProps } from './if'
import { Choose, OtherWise, When } from './choose'

export default {
  component: If,
  title: 'Components/Conditions'
} as Meta

const IfTemplate: Story<PropsWithChildren<IfProps>> = (args) => {
  return <If {...args}>Content Inside If</If>
}

export const IfStatement = IfTemplate.bind({})
IfStatement.args = {
  condition: true
}

const ConditionTemplate: Story<PropsWithChildren<{ condition1: boolean; condition2: boolean; condition3: boolean }>> = (
  args
) => {
  return (
    <Choose>
      <When condition={args.condition1}>Condition 1 meet</When>
      <When condition={args.condition2}>Condition 2 meet</When>
      <When condition={args.condition3}>Condition 3 meet</When>
      <OtherWise>Otherwise meet</OtherWise>
    </Choose>
  )
}

export const ConditionStatement = ConditionTemplate.bind({})
ConditionStatement.args = {
  condition1: true,
  condition2: true,
  condition3: true
}
