import classNames from 'classnames';
import React, { ReactNode } from 'react';

import style from './style.module.scss';

export interface FieldProps {
  className?: string;
  label: string;
  readonly?: boolean;
  error?: boolean;
  children: ReactNode;
}

export default function Field({ className, label, readonly = false, error = false, children }: FieldProps): JSX.Element {
  return (
    <div className={classNames(
        style.wrapper,
        className,
        { [style.readonly]: readonly },
        { [style.error]: error },
    )}>
      <label>{ label }</label>
      {children}
    </div>
  );
}
