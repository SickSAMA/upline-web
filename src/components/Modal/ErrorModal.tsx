import React, { MouseEventHandler, useCallback } from 'react';
import Modal from 'react-modal';

import IconSorry from '@/components/SVG/sorry.svg';
import { HTML_ROOT_ELEMENT_ID } from '@/configs/constants';
import useSetBodyScrollbarPadding from '@/utils/useSetBodyScrollbarPadding';

import style from './style.module.scss';

interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClicked?(event?: React.MouseEvent | React.KeyboardEvent): void;
}

Modal.setAppElement(HTML_ROOT_ELEMENT_ID);

export default function ErrorModal({ isOpen, onButtonClicked, message, title, buttonText }: ErrorModalProps): JSX.Element {
  useSetBodyScrollbarPadding(isOpen, 150);

  const onRequestClose: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={150}
      onRequestClose={onRequestClose}
      shouldFocusAfterRender={false}
      contentLabel="Error Modal"
      bodyOpenClassName="modal-open"
      className={{
        base: style['errorModal__dialog'],
        afterOpen: style['errorModal__dialog--after-open'],
        beforeClose: style['errorModal__dialog--before-close'],
      }}
      overlayClassName={{
        base: style.errorModal,
        afterOpen: style['errorModal--after-open'],
        beforeClose: style['errorModal--before-close'],
      }}
    >
      <div className={style['errorModal__content']}>
        <div className={style['errorModal__icon']}>
          <IconSorry />
        </div>
        <h2>{ title || 'Something went wrong' }</h2>
        {
          message && <p>{ message }</p>
        }
        {
          onButtonClicked && (
            <button className={style['errorModal__button']} onClick={onButtonClicked}>
              { buttonText || 'Try again' }
            </button>
          )
        }
      </div>
    </Modal>
  );
}
