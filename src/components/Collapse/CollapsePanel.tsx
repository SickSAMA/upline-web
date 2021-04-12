import RcCollapse from 'rc-collapse';
import * as React from 'react';

export type CollapsibleType = 'header' | 'disabled';

export interface CollapsePanelProps {
  header: string | React.ReactNode;
  headerClass?: string;
  className?: string;
  showArrow?: boolean;
  forceRender?: boolean;
  collapsible?: CollapsibleType;
  children?: React.ReactNode;
}

export default function CollapsePanel(props: CollapsePanelProps): JSX.Element {
  return <RcCollapse.Panel {...props} />;
}
