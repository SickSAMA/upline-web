import React, { ReactNode } from 'react';
import classNames from 'classnames';
import style from './style.module.scss';

interface SkeletonRowProps {
  big?: boolean
  children: ReactNode
}

export default function SkeletonRow({ big = false, children }: SkeletonRowProps): JSX.Element {
  return (
    <div className={classNames(style.row, { [style.big]: big })}>
      { children }
    </div>
  );
}
