import Link from 'next/link';
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';

import Dropdown from '@/components/Dropdown';
import { AuthModal } from '@/components/Modal';
import IconAvatar from '@/components/SVG/avatar.svg';
import { getSession, logout } from '@/utils/auth';
import { DASHBOARD_ACCOUNT, DASHBOARD_RESUMES, HOME, JOIN, resumeEdit } from '@/utils/routes';

import style from './style.module.scss';

export default function Header(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>();

  const openModal: MouseEventHandler = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  useEffect(() => {
    const checkSession = async (): Promise<void> => {
      try {
        await getSession();
        setLoggedIn(true);
      } catch (_) {
        setLoggedIn(false);
      }
    };
    checkSession();
  }, [setLoggedIn]);

  let userLink: JSX.Element | null = null;
  if (isLoggedIn) {
    userLink = (
      <Dropdown
        className={style.headerDropdown}
        button={<IconAvatar />}
        menu={[
          {
            text: 'Account',
            href: DASHBOARD_ACCOUNT,
          },
          {
            text: 'Resumes',
            href: DASHBOARD_RESUMES,
          },
          {
            text: 'Log out',
            onClick: () => {
              logout();
            },
          },
        ]}
      />
    );
  } else if (isLoggedIn === false) {
    userLink = (
      <Link href={JOIN}>
        <a className={style['headerNav__join']} onClick={openModal}>Join now</a>
      </Link>
    );
  }

  return (
    <div className={style.header}>
      <div className={style['header__container']}>
        <Link href={HOME}>
          <a className={style['header__logo']}>
            <img src="/logo.png" alt="logo" />
          </a>
        </Link>
        <div className={style['headerNav']}>
          <div className={style['headerNav__left']}>
            {/* <Link href={resumeEdit()}>
              <a>Resume Editor</a>
            </Link> */}
          </div>
          <div className={style['headerNav__right']}>
            {
              isLoggedIn && userLink
            }
            <Link href={resumeEdit()}>
              <a className={style['headerNav__button']}>Create resume</a>
            </Link>
            {
              !isLoggedIn && userLink
            }
          </div>
        </div>
      </div>
      <AuthModal
        page="join"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
}
