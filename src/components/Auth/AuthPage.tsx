import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import getRouterQueryValue from '@/utils/getRouterQueryValue';
import { HOME } from '@/utils/routes';
import useAuth from '@/utils/useAuth';

import Auth, { Page } from './Auth';
import style from './style.module.scss';

/**
 * This is the page containing join, login, etc
 */

interface AuthPageProps {
  page: Page;
}

export default function AuthPage({ page }: AuthPageProps): JSX.Element | null {
  const [isLogin, loading] = useAuth();
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!isLogin) {
    const onLoginSuccess = () => {
      const redirectLink = getRouterQueryValue(router, 'redirect');
      if (redirectLink) {
        location.href = redirectLink;
      } else {
        router.reload();
      }
    };

    return (
      <div className={style['authPage__wrapper']}>
        <div className={style['authPage__bg']}>
          <Link href={HOME}>
            <a>Upline</a>
          </Link>
        </div>
        <div className={style['authPage__content']}>
          <Auth page={page} onLoginSuccess={onLoginSuccess} className={style['authPage__auth']} />
        </div>
      </div>
    );
  } else {
    router.push(HOME);
    return null;
  }
}
