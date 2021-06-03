import Link from 'next/link';
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { LoginModal } from '@/components/Modal';
import { getSession, logout } from '@/utils/auth';
import { HOME, JOIN, resumeEdit } from '@/utils/routes';

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

  const _logout: MouseEventHandler = (e) => {
    e.preventDefault();
    logout();
  };

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
    userLink = <a href="#" className={style['headerNav__join']} onClick={_logout}>Log out</a>;
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
            Upline
          </a>
        </Link>
        <div className={style['headerNav']}>
          <div className={style['headerNav__left']}>
            <Link href={resumeEdit()}>
              <a>Resume Editor</a>
            </Link>
          </div>
          <div className={style['headerNav__right']}>
            <Link href={resumeEdit()}>
              <a className={style['headerNav__button']}>Create resume</a>
            </Link>
            { userLink }
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
}
