import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import IconAccount from '@/components/SVG/account.svg';
import IconLogout from '@/components/SVG/logout.svg';
import IconResume from '@/components/SVG/resume.svg';
import { logout } from '@/utils/auth';

import style from '../style.module.scss';

type MenuItem = 'account' | 'resumes';

interface SideMenuProps {
  activeItem: MenuItem;
}

const menuItems = [
  {
    key: 'account',
    label: 'Account',
    icon: <IconAccount />,
  },
  {
    key: 'resumes',
    label: 'Resumes',
    icon: <IconResume />,
  },
];

export default function SideMenu({ activeItem }: SideMenuProps): JSX.Element {
  return (
    <div className={style.sidemenu}>
      {
        menuItems.map((item) => (
          <Link key={item.key} href="#">
            <a className={classNames(style['sidemenu__item'], { [style['sidemenu__item--active']]: activeItem === item.key })}>
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
