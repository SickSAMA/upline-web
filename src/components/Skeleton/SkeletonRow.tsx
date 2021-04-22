import classNames from 'classnames';
import React, { ReactNode } from 'react';

import style from './style.module.scss';

interface SkeletonRowProps {
  children: ReactNode
}

export default function SkeletonRow({ children }: SkeletonRowProps): JSX.Element {
  return (
    <div className={classNames(style.row)}>
      { children }
    </div>
  );
}
