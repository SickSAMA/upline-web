import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import { useEffect, useState } from 'react';

export default function useSetBodyScrollbarPadding(isModalOpen: boolean, closingDelay = 0): void {
  const [isOpen, setIsOpen] = useState(isModalOpen);

  // to keep local state sync with props
  useEffect(() => {
    if (isModalOpen !== isOpen) {
      setIsOpen(isModalOpen);
    }
  }, [isModalOpen, isOpen, setIsOpen]);

  // set body padding
  useEffect(() => {
    if (isOpen) {
      const scrollBarSize = getScrollBarSize();
      document.getElementsByTagName('body')[0].style.paddingRight = `${scrollBarSize}px`;
    } else {
      setTimeout(() => {
        document.getElementsByTagName('body')[0].style.paddingRight = '0';
      }, closingDelay);
    }
  }, [isOpen]);
}
