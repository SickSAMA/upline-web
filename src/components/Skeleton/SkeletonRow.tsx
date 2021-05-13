import classNames from 'classnames';
import React, { ReactNode } from 'react';

import style from './style.module.scss';

interface SkeletonRowProps {
  children: ReactNode,
  height?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
}

export default function SkeletonRow({ height, children }: SkeletonRowProps): JSX.Element {
  return (
    <div className={classNames(style.row, { [style[`row--${height}`]]: height })}>
      { children }
    </div>
  );
}
