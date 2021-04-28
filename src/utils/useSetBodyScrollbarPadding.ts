import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import { useEffect, useState } from 'react';

import { hasScrollBarOnBody } from '@/utils/hasScrollBar';

export default function useSetBodyScrollbarPadding(isModalOpen: boolean, closingDelay = 0): void {
  const [isOpen, setIsOpen] = useState(isModalOpen);

  // to keep local state sync with props
  useEffect(() => {
    if (isModalOpen !== isOpen) {
      setIsOpen(isModalOpen);
    }
  }, [isModalOpen, isOpen]);

  // set body padding
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (hasScrollBarOnBody()) {
      if (isOpen) {
        const scrollBarSize = getScrollBarSize();
        body.style.paddingRight = `${scrollBarSize}px`;
      } else {
        setTimeout(() => {
          body.style.paddingRight = '0';
        }, closingDelay);
      }
    }
  }, [isOpen, closingDelay]);
}
