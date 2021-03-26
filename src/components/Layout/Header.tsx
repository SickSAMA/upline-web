import Link from 'next/link';
import React, { useState } from 'react';

import { LoginModal } from '@/components/Modal';
import { HOME, RESUME_EDIT } from '@/utils/routes';

import style from './style.module.scss';

export default function Header(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
            <Link href={RESUME_EDIT}>
              <a>Resume Editor</a>
            </Link>
            <Link href="#">
              <a>Our Story</a>
            </Link>
          </div>
          <div className={style['headerNav__right']}>
            <Link href={RESUME_EDIT}>
              <a className={style['headerNav__button']}>Create resume</a>
            </Link>
            <Link href="#">
              <a className={style['headerNav__join']} onClick={openModal}>Join now</a>
            </Link>
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
