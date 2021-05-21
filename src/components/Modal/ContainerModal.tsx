import React, { ReactNode } from 'react';
import Modal from 'react-modal';

import { HTML_ROOT_ELEMENT_ID } from '@/configs/constants';
import useSetBodyScrollbarPadding from '@/utils/useSetBodyScrollbarPadding';

import style from './style.module.scss';

/**
 * This modal is used as container to display passed in modal content
 */

interface ContainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAfterOpen?: () => void;
  children: ReactNode;
}

Modal.setAppElement(HTML_ROOT_ELEMENT_ID);

export default function ContainerModal({ isOpen, onClose, onAfterOpen, children }: ContainerModalProps): JSX.Element {
  useSetBodyScrollbarPadding(isOpen, 150);

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={150}
      onRequestClose={onClose}
      onAfterOpen={onAfterOpen}
      shouldFocusAfterRender={true}
      contentLabel="Modal"
      bodyOpenClassName="modal-open"
      className={{
        base: style['containerModal__dialog'],
        afterOpen: style['containerModal__dialog--after-open'],
        beforeClose: style['containerModal__dialog--before-close'],
      }}
      overlayClassName={{
        base: style.containerModal,
        afterOpen: style['containerModal--after-open'],
        beforeClose: style['containerModal--before-close'],
      }}
    >
      { children }
    </Modal>
  );
}
