import React from 'react';
import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';

export type PageContentHeaderProps = PageHeaderProps & {
  icon?: JSX.Element,
};

const PageContentHeader: React.FC<PageContentHeaderProps> = ({ icon, title, children, ...props }) => (
  <PageHeader
    title={(
      <>
        {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
        {title}
      </>
    )}
    style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
    {...props}
  >
    {children}
  </PageHeader>
);

export default PageContentHeader;
