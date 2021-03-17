import React, { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import style from './style.module.scss';

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className={style.wrapper}>
      <Header />
      { children }
      <Footer />
    </div>
  );
}
