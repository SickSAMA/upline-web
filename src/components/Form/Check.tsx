import classNames from 'classnames';
import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import style from './style.module.scss';

interface SwitchProp {
  id: string;
  disabled?: boolean;
  className?: string;
  label: string | JSX.Element;
  type?: 'checkbox' | 'radio' | 'switch';
  error?: string;
  // for react hook form
  name: string;
  control?: Control<any>; // eslint-disable-line
  rules?: RegisterOptions;
}

export default function Switch({ id, label, disabled = false, className, type = 'checkbox', error, ...rest }: SwitchProp): JSX.Element {
  const { field } = useController(rest);
  return (
    <div className={classNames(style.check, { [style.switch]: type === 'switch' }, className)}>
      <input type={type === 'radio' ? 'radio' : 'checkbox'} id={id} disabled={disabled} {...field} />
      <label htmlFor={id}>{ label }</label>
      {
        error && <div className={style['check__error']}>{ error }</div>
      }
    </div>
  );
}
