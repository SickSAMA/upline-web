import React, { ReactNode } from 'react';

import style from './style.module.scss';

/**
 * <Skeleton>
 *  <SkeletonCol col={12}>
 *   <SkeletonRow height="h1">
 *    <SkeletonCol col={8}/>
 *    <SkeletonCol col={4} empty />
 *    <SkeletonCol col={12} empty />
 *   </SkeletonRow>
 *  </SkeletonCol>
 * </Skeleton>
 */

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
