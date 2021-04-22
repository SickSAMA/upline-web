import React from 'react';
import Modal from 'react-modal';

import { Auth } from '@/components/Auth';
import IconClose from '@/components/SVG/close.svg';
import { HTML_ROOT_ELEMENT_ID } from '@/configs/constants';
import { LOGIN } from '@/utils/routes';
import useSetBodyScrollbarPadding from '@/utils/useSetBodyScrollbarPadding';

import style from './style.module.scss';

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose(event?: React.MouseEvent | React.KeyboardEvent): void;
  onLoginSuccess?(): void;
}

Modal.setAppElement(HTML_ROOT_ELEMENT_ID);

export default function LoginModal({ isOpen, onRequestClose, onLoginSuccess }: LoginModalProps): JSX.Element {
  useSetBodyScrollbarPadding(isOpen, 150);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={150}
      contentLabel="Login Modal"
      bodyOpenClassName="modal-open"
      className={{
        base: style['loginModal__dialog'],
        afterOpen: style['loginModal__dialog--after-open'],
        beforeClose: style['loginModal__dialog--before-close'],
      }}
      overlayClassName={{
        base: style.loginModal,
        afterOpen: style['loginModal--after-open'],
        beforeClose: style['loginModal--before-close'],
      }}
    >
      <div className={style['loginModal__content']}>
        <div />
        <div>
          <Auth page={LOGIN} mode="single-page" onLoginSuccess={onLoginSuccess} />
          <button className={style['loginModal__close']} onClick={onRequestClose}>
            <IconClose />
          </button>
        </div>
      </div>
    </Modal>
  );
}
