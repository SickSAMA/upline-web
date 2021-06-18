import React from 'react';
import Modal from 'react-modal';

import { Auth, Page } from '@/components/Auth';
import IconClose from '@/components/SVG/close.svg';
import { HTML_ROOT_ELEMENT_ID } from '@/configs/constants';
import useSetBodyScrollbarPadding from '@/utils/useSetBodyScrollbarPadding';

import style from './style.module.scss';

interface AuthModalProps {
  page: Page;
  isOpen: boolean;
  onRequestClose(event?: React.MouseEvent | React.KeyboardEvent): void;
  onLoginSuccess?(): void;
}

Modal.setAppElement(HTML_ROOT_ELEMENT_ID);

export default function AuthModal({ isOpen, page, onRequestClose, onLoginSuccess }: AuthModalProps): JSX.Element {
  useSetBodyScrollbarPadding(isOpen, 150);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      closeTimeoutMS={150}
      contentLabel="Auth Modal"
      bodyOpenClassName="modal-open"
      className={{
        base: style['authModal__dialog'],
        afterOpen: style['authModal__dialog--after-open'],
        beforeClose: style['authModal__dialog--before-close'],
      }}
      overlayClassName={{
        base: style.authModal,
        afterOpen: style['authModal--after-open'],
        beforeClose: style['authModal--before-close'],
      }}
    >
      <div className={style['authModal__content']}>
        <div />
        <div>
          <Auth page={page} mode="single-page" onLoginSuccess={onLoginSuccess} />
          <button className={style['authModal__close']} onClick={onRequestClose}>
            <IconClose />
          </button>
        </div>
      </div>
    </Modal>
  );
}
