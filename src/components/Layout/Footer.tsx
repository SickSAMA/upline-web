import Link from 'next/link';
import React from 'react';

import { ABOUT, CONTACT_US, PRIVACY_POLICY, TERMS_CONDITIONS } from '@/utils/routes';

import style from './style.module.scss';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <div className={style.footer}>
      <div className={style['footer__container']}>
        <div className={style['footer__links']}>
          <Link href={ABOUT}>
            <a>About</a>
          </Link>
          <Link href={CONTACT_US}>
            <a>Contact</a>
          </Link>
          <Link href={PRIVACY_POLICY}>
            <a>Privacy</a>
          </Link>
          <Link href={TERMS_CONDITIONS}>
            <a>Terms</a>
          </Link>
        </div>
        <div className={style['footer__copyright']}>
          &copy; { currentYear } Upline
        </div>
      </div>
    </div>
  );
}
