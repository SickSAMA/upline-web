import React from 'react';

import styles from './Button.module.scss';

const Button = (): JSX.Element => (
  <div className={styles.button}>
    <div className={styles['button__child--main']}>Sick</div>
    <button>Click Me</button>
  </div>
);

export default Button;
