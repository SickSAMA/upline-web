import React, { KeyboardEvent, MouseEvent, useCallback } from 'react';
import Modal from 'react-modal';

import IconCheck from '@/components/SVG/check.svg';
import IconClose from '@/components/SVG/close.svg';
import IconDanger from '@/components/SVG/danger.svg';
import { HTML_ROOT_ELEMENT_ID } from '@/configs/constants';

import style from './style.module.scss';

export type MessageType = 'error' | 'success';

interface NoticeModalProps {
  isOpen: boolean;
  message: string;
  type: MessageType;
  onClose: () => void;
}

Modal.setAppElement(HTML_ROOT_ELEMENT_ID);

export default function NoticeModal({ isOpen, message, type, onClose }: NoticeModalProps): JSX.Element {
  const onRequestClose = useCallback((e: MouseEvent | KeyboardEvent) => {
    e.preventDefault();
    if (e.type === 'keydown') {
      onClose();
    }
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={150}
      onRequestClose={onRequestClose}
      shouldFocusAfterRender={true}
      contentLabel="Notice Modal"
      bodyOpenClassName="noticeModal-open"
      className={{
        base: `${style['noticeModal__dialog']} ${style[`noticeModal__dialog--${type}`]}`,
        afterOpen: style['noticeModal__dialog--after-open'],
        beforeClose: style['noticeModal__dialog--before-close'],
      }}
      overlayClassName={{
        base: style.noticeModal,
        afterOpen: style['noticeModal--after-open'],
        beforeClose: style['noticeModal--before-close'],
      }}
    >
      <div className={style['noticeModal__icon']}>
        {
          type === 'success' ? <IconCheck /> : <IconDanger />
        }
      </div>
      <p>{ message }</p>
      <button className={style['noticeModal__close']} onClick={onClose}>
        <IconClose />
      </button>
    </Modal>
  );
}
