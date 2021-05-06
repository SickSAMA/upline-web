import React, { ReactNode } from 'react';

import style from '../style.module.scss';
import SideMenu from './SideMenu';

interface BodyLayoutProps {
  children?: ReactNode
}

export default function BodyLayout({ children }: BodyLayoutProps): JSX.Element {
  return (
    <div className={style.container}>
      <SideMenu />
      <div className={style.body}>
        { children }
      </div>
    </div>
  );
}
