import classNames from 'classnames';
import React, { Fragment, useState } from 'react';

import style from './style.module.scss';

export default function Modal(): JSX.Element {
  const content: Array<JSX.Element> = [];
  for (let i = 0; i < 100; i ++) {
    content.push(<p key={i}>This is a line</p>);
  }

  const [isHiden, toggle] = useState(true);

  return (
    <Fragment>
      <div className={style.content}>
        <button onClick={() => toggle(false)}>Show Modal</button>
        { content }
      </div>
      <div className={classNames(style.modal, { [style.shown]: !isHiden })}>
        <button onClick={() => toggle(true)}>Hide Modal</button>
        { content }
      </div>
    </Fragment>
  );
}
