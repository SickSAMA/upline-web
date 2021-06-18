import Image from 'next/image';
import React from 'react';

import Layout from '@/components/Layout';

import style from './style.module.scss';

export default function About(): JSX.Element {
  return (
    <Layout>
      <>
        <div className={style.container}>
          <h1>Enlighten Your Career</h1>
          <p>
          Established in 2020, Career Go&apos;s vision is to help the vast number of students secure better opportunities.
          We create this platform to help them write better CV, whether for job hunting or for school application.
          </p>
          <p>
          The founding team numbers are graduates from world top universities. One is a senior software engineer
          currently working in FANNG, the other is a banker with a wall street top notch investment bank.
          </p>
        </div>
        {/* <div className={style.bg} /> */}
        <div>
          <Image
            alt="bg"
            src="/about-bg.jpg"
            layout="responsive"
            width="1440"
            height="569"
          />
        </div>
      </>
    </Layout>
  );
}
