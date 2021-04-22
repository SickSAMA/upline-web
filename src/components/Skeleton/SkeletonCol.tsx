import classNames from 'classnames';
import React, { ReactNode } from 'react';

import style from './style.module.scss';

interface SkeletonColProps {
  col: number;
  empty?: boolean;
  height?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
  children?: ReactNode;
}

export default function SkeletonCol({ col, empty = false, height = 'p', children }: SkeletonColProps): JSX.Element {
  return (
    <div className={classNames(style[`col-${col}`], style[height], { [style.empty]: empty })}>
      { children }
    </div>
  );
}

