import classNames from 'classnames';
import React from 'react';

import style from './style.module.scss';

interface SubmitProps {
  value: string;
  isSubmitting: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Submit({ value, isSubmitting, className, disabled = false }: SubmitProps): JSX.Element {
  return (
    <div className={classNames(style.submit, className, { [style.disabled]: isSubmitting || disabled })} >
      <input type="submit" disabled={isSubmitting || disabled} value={value} />
    </div>
  );
}
