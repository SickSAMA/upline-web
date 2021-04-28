import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import Modal from 'react-modal';

import IconWarning from '@/components/SVG/warning.svg';
import { HTML_ROOT_ELEMENT_ID } from '@/configs/constants';
import useSetBodyScrollbarPadding from '@/utils/useSetBodyScrollbarPadding';

import style from './style.module.scss';

// the button we want customers to click
type Emphasis = 'cancel' | 'continue';

interface ConfirmModalProps {
  isOpen: boolean;
  message?: string;
  emphasis?: Emphasis;
  onContinue: MouseEventHandler;
  onCancel: MouseEventHandler;
}

Modal.setAppElement(HTML_ROOT_ELEMENT_ID);

export default function ConfirmModal({ isOpen, message, emphasis, onCancel, onContinue }: ConfirmModalProps): JSX.Element {
  useSetBodyScrollbarPadding(isOpen, 150);

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={150}
      onRequestClose={onCancel}
      shouldFocusAfterRender={true}
      contentLabel="Confirm Modal"
      bodyOpenClassName="modal-open"
      className={{
        base: style['confirmModal__dialog'],
        afterOpen: style['confirmModal__dialog--after-open'],
        beforeClose: style['confirmModal__dialog--before-close'],
      }}
      overlayClassName={{
        base: style.confirmModal,
        afterOpen: style['confirmModal--after-open'],
        beforeClose: style['confirmModal--before-close'],
      }}
    >
      <div className={style['confirmModal__content']}>
        <div className={style['confirmModal__icon']}>
          <IconWarning />
        </div>
        {
          message && <p>{ message }</p>
        }
        <div className={classNames(style['confirmModal__button'], style[`confirmModal__button--${emphasis}`])}>
          <button onClick={onContinue}>Continue</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}
