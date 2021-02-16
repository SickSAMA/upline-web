import React, { ReactNode } from 'react';
import style from './style.module.scss';

interface SkeletonProps {
  children?: ReactNode
}

export default function Skeleton({ children }: SkeletonProps): JSX.Element {
  return (
    <div className={style.container}>
      { children }
    </div>
  );
}
