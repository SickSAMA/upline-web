import classNames from 'classnames';
import React, { ReactNode } from 'react';

import ErrorMessage from './ErrorMessage';
import style from './style.module.scss';

export interface FieldProps {
  className?: string;
  label?: string;
  readonly?: boolean;
  error?: string | undefined;
  children: ReactNode;
}

export default function Field({ className, label, readonly = false, error = undefined, children }: FieldProps): JSX.Element {
  return (
    <div className={classNames(
        style.field,
        className,
        { [style.readonly]: readonly },
        { [style.error]: error },
    )}>
      { label && <label>{ label }</label> }
      {children}
      { error && <ErrorMessage className={style.fieldError} size="sm" message={error} /> }
    </div>
  );
}
