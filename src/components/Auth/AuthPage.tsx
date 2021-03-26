import Link from 'next/link';
import React from 'react';

import { HOME } from '@/utils/routes';

import Auth, { Page } from './Auth';
import style from './style.module.scss';

/**
 * This is the page containing join, login, etc
 */

interface AuthPageProps {
  page: Page;
}

export default function AuthPage({ page }: AuthPageProps): JSX.Element {
  return (
    <div className={style['authPage__wrapper']}>
      <div className={style['authPage__bg']}>
        <Link href={HOME}>
          <a>Upline</a>
        </Link>
      </div>
      <div className={style['authPage__content']}>
        <Auth page={page} className={style['authPage__auth']} />
      </div>
    </div>
  );
}
