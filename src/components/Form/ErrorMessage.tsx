import classNames from 'classnames';
import React from 'react';

import IconAlert from '@/components/SVG/alert.svg';

import style from './style.module.scss';

interface ErrorMessageProps {
  message: string;
  className?: string;
  size?: 'sm' | 'normal' | 'lg';
}

export default function ErrorMessage({ message, className, size = 'normal' }: ErrorMessageProps): JSX.Element | null {
  if (message) {
    return (
      <div className={classNames(style.errorMessage, { [style[`errorMessage--${size}`]]: size !== 'normal' }, className)}>
        <IconAlert />{ message }
      </div>
    );
  } else {
    return null;
  }
}
