import Link from 'next/link';
import React from 'react';

import style from './style.module.scss';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <div className={style.footer}>
      <div className={style['footer__container']}>
        <div className={style['footer__links']}>
          <Link href="#">
            <a>About</a>
          </Link>
          <Link href="#">
            <a>Contact</a>
          </Link>
          <Link href="#">
            <a>Conditions</a>
          </Link>
        </div>
        <div className={style['footer__copyright']}>
          &copy; { currentYear } Upline
        </div>
      </div>
    </div>
  );
}
