import React from 'react';
import ReactSelect, { Props } from 'react-select';

import style from './style.module.scss';

export interface Option {
  value: string;
  label: string;
}

type SelectProps = Partial<Props<Option, false>>;

export default function Select(props: SelectProps): JSX.Element {
  return (
    <ReactSelect
      {...props}
      className={style.select}
      classNamePrefix={style.select}
    />
  );
}
