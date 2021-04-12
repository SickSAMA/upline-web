import RcCollapse from 'rc-collapse';
import { CSSMotionProps } from 'rc-motion';
import toArray from 'rc-util/lib/Children/toArray';
import React, { cloneElement, Key, ReactElement, ReactNode } from 'react';

import IconArrowDown from '@/components/SVG/arrowDown.svg';

import collapseMotion from './motion';
import style from './style.module.scss';

type CollapsibleType = 'header' | 'disabled';
type IconType = 'arrow';

interface CollapseProps {
  activeKey?: Key | Key[];
  defaultActiveKey?: Key | Key[];
  accordion?: boolean;
  onChange?: (key: Key | Key[]) => void;
  className?: string;
  icon?: IconType;
  collapsible?: CollapsibleType;
  showArrow?: boolean;
  children: ReactNode;
}

export default function Collapse(props: CollapseProps): JSX.Element {
  const { icon = 'arrow', showArrow = true, children, ...restProps } = props;

  const prefixCls = style.collapse;

  const openMotion: CSSMotionProps = {
    ...collapseMotion,
    motionName: `${prefixCls}-motion`,
  };

  // if (icon) {

  // }

  const getItems = () => {
    return toArray(children).map((child: ReactElement, index: number) => {
      const key = child.key || index.toString();
      let header = child.props.header;
      if (showArrow) {
        if (icon === 'arrow') {
          header = (
            <div className={`${style.header} ${style['header--arrow']}`}>
              { header }
              <IconArrowDown />
            </div>
          );
        }
      }

      const childProps = {
        ...child.props,
        header,
        showArrow: false,
        key,
      };
      return cloneElement(child, childProps);
    });
  };

  return (
    <RcCollapse
      openMotion={openMotion}
      prefixCls={prefixCls}
      {...restProps}
    >
      { getItems() }
    </RcCollapse>
  );
}

