import Link from 'next/link';
import React from 'react';

import { home, resumeEditor } from '@/utils/routes';

import style from './style.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={style.header}>
      <div className={style['header__container']}>
        <Link href={home}>
          <a className={style['header__logo']}>
            Upline
          </a>
        </Link>
        <div className={style['headerNav']}>
          <div className={style['headerNav__left']}>
            <Link href={resumeEditor}>
              <a>Resume Editor</a>
            </Link>
            <Link href="#">
              <a>Our Story</a>
            </Link>
          </div>
          <div className={style['headerNav__right']}>
            <Link href={resumeEditor}>
              <a className={style['headerNav__button']}>Create resume</a>
            </Link>
            <Link href="#">
              <a className={style['headerNav__join']}>Join now</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
