import React from 'react'
import { Meta, Story } from '@storybook/react'
import { PageContent, PageContentProps } from './page-content'
import { PageContentHeader, PageContentHeaderProps } from './components/page-content-header'
import { PageContentElement, PageContentElementProps } from './components/page-content-element'
import { MemoryRouter } from 'react-router-dom'
import { Button } from '../button'
import { DashboardOutlined } from '@ant-design/icons'

export default {
  component: PageContent,
  subcomponents: { PageContentHeader, PageContentElement },
  title: 'Components/Page Content'
} as Meta

type TemplateProps = {
  contentProps?: PageContentProps
  headerProps?: PageContentHeaderProps
  elementProps?: PageContentElementProps
}

const Template: Story<TemplateProps> = (args) => (
  <MemoryRouter>
    <PageContent {...args.contentProps}>
      <PageContent.Header icon={<DashboardOutlined />} title="Title" {...args.headerProps} />
      <PageContent.Element
        title="My Title"
        subTitle="My SubTitle"
        extra={<Button type="primary">Add Something</Button>}
        {...args.elementProps}
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
        diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet.
      </PageContent.Element>
      <PageContent.Element style={{ height: 300 }} title="My Title">
        Content
      </PageContent.Element>
    </PageContent>
  </MemoryRouter>
)

export const Base = Template.bind({})
Base.args = {}

export const WithElementType = Template.bind({})
WithElementType.args = {
  elementProps: {
    type: 'primary'
  }
}

export const ContentLoading = Template.bind({})
ContentLoading.args = {
  contentProps: {
    loading: true
  }
}

export const ElementLoading = Template.bind({})
ElementLoading.args = {
  elementProps: {
    loading: true
  }
}

export const NoElementPadding = Template.bind({})
NoElementPadding.args = {
  elementProps: {
    title: undefined,
    subTitle: undefined,
    extra: undefined,
    removeBodyPadding: true
  }
}

export const NoElementHeader = Template.bind({})
NoElementHeader.args = {
  elementProps: {
    title: undefined,
    subTitle: undefined,
    extra: undefined
  }
}

export const Collapsable = Template.bind({})
Collapsable.args = {
  elementProps: {
    collapsable: true
  }
}

export const CollapsableNoHeader = Template.bind({})
CollapsableNoHeader.args = {
  elementProps: {
    title: undefined,
    subTitle: undefined,
    extra: undefined,
    collapsable: true
  }
}

export const CollapsableInitCollapsed = Template.bind({})
CollapsableInitCollapsed.args = {
  elementProps: {
    collapsable: true,
    initialCollapsed: true
  }
}
