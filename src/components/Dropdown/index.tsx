import classNames from 'classnames';
import Link from 'next/link';
import React, { AnchorHTMLAttributes, DetailedHTMLProps, MouseEventHandler, ReactNode } from 'react';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import style from './style.module.scss';

interface MenuItem {
  text: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
}

interface DropdownProps {
  button: ReactNode;
  menu: MenuItem[];
  className?: string;
  placement?: 'left-bottom' | 'center-bottom' | 'right-bottom';
}

export default function Dropdown({ button, menu, className, placement = 'center-bottom' }: DropdownProps): JSX.Element {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(menu.length);

  return (
    <div className={classNames(style.container, className)}>
      <button className={style.button} type="button" {...buttonProps}>
        { button }
      </button>
      <div className={
        classNames(
            style.dropdown,
            style[`dropdown--${placement}`],
            { [style.visible]: isOpen },
        )} role="menu">
        <div className={style['dropdown__content']}>
          {
            menu.map((item, index) => {
              const props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> = itemProps[index];

              if (item.href && !item.onClick) {
                return (
                  <Link key={index} href={item.href}>
                    <a {...props}>{ item.text }</a>
                  </Link>
                );
              } else {
                props.key = index;
                if (item.href) {
                  props.href = item.href;
                }
                const onClick = item.onClick;
                if (onClick) {
                  props.onClick = (e) => {
                    onClick(e);
                    setIsOpen(false);
                  };
                }
                return <a {...props}>{ item.text }</a>;
              }
            })
          }
        </div>
      </div>
    </div>
  );
}
