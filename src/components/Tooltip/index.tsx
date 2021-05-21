import { Placement } from '@popperjs/core';
import React, { useCallback, useState } from 'react';
import { usePopper } from 'react-popper';

import useEventListener from '@/utils/useEventListener';

import style from './style.module.scss';

interface TooltipProps {
  id: string; // used for aria-describedby
  text: string;
  tooltip: string;
  placement: Placement; // https://popper.js.org/docs/v2/constructors/#options
}

export default function Tooltip({ id, text, tooltip, placement = 'bottom' }: TooltipProps): JSX.Element {
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);
  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'arrow',
        options: {
          element: arrowElement,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  const show = useCallback(() => {
    if (popperElement && update) {
      popperElement.setAttribute('data-show', '');
      update();
    }
  }, [popperElement, update]);

  const hide = useCallback(() => {
    if (popperElement) {
      popperElement.removeAttribute('data-show');
    }
  }, [popperElement]);

  useEventListener(['mouseenter', 'focus'], show, referenceElement);
  useEventListener(['mouseleave', 'blur'], hide, referenceElement);

  return (
    <>
      <span ref={setReferenceElement} aria-describedby={id}>
        { text }
      </span>
      <div id={id} className={style.tooltip} ref={setPopperElement} role="tooltip" style={styles.popper} {...attributes.popper}>
        { tooltip }
        <div className={style.arrow} ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );
}
