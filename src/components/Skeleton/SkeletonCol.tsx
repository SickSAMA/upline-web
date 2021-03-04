import classNames from 'classnames';
import React, { ReactNode } from 'react';

import style from './style.module.scss';

interface SkeletonColProps {
  col: number
  big?: boolean
  empty?: boolean
  children?: ReactNode
}

export default function SkeletonCol({ col, big = false, empty = false, children }: SkeletonColProps): JSX.Element {
  return (
    <div className={classNames(style[`col-${col}`], { [style.big]: big, [style.empty]: empty })}>
      { children }
    </div>
  );
}

