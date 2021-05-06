import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import IconAccount from '@/components/SVG/account.svg';
import IconLogout from '@/components/SVG/logout.svg';
import IconResume from '@/components/SVG/resume.svg';
import { logout } from '@/utils/auth';
import { DASHBOARD_ACCOUNT, DASHBOARD_RESUMES } from '@/utils/routes';

import style from '../style.module.scss';

type MenuItem = 'account' | 'resumes';

const menuItems = [
  {
    key: 'account',
    label: 'Account',
    href: DASHBOARD_ACCOUNT,
    icon: <IconAccount />,
  },
  {
    key: 'resumes',
    label: 'Resumes',
    href: DASHBOARD_RESUMES,
    icon: <IconResume />,
  },
];

export default function SideMenu(): JSX.Element {
  const router = useRouter();

  return (
    <div className={style.sidemenu}>
      {
        menuItems.map((item) => (
          <Link key={item.key} href={item.href}>
            <a className={classNames(style['sidemenu__item'], { [style['sidemenu__item--active']]: router.pathname === item.href })}>
              { item.icon }
              <span>{ item.label }</span>
            </a>
          </Link>
        ))
      }

      <button type="button" className={style['sidemenu__logout']} onClick={logout}>
        <IconLogout />
        <span>Sign out</span>
      </button>
    </div>
  );
}
