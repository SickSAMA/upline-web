import React, { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import style from './style.module.scss';

interface LayoutProps {
  children?: ReactNode
  type?: 'default' | 'editor';
}

export default function Layout({ children, type = 'default' }: LayoutProps): JSX.Element {
  if (type === 'default') {
    return (
      <div className={style.default}>
        <Header />
        { children }
        <Footer />
      </div>
    );
  } else {
    return (
      <div className={style.editor}>
        <Header />
        { children }
      </div>
    );
  }
}
