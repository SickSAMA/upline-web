import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Layout from '@/components/Layout';
import { resumeEdit } from '@/utils/routes';

import style from './style.module.scss';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <div className={style.body}>
        <div className={style.container}>
          <h1>Create a professional resume with ease for free</h1>
          <p>
            Are you still looking for resume templates or examples? Not any more!
            Try our free resume editor today to create a professional resume in no time.
          </p>
          <Link href={resumeEdit()}>
            <a>Start now</a>
          </Link>
        </div>
        <div className={style.screenshot}>
          <Image
            alt="resume editor"
            src="/home-screenshot.jpg"
            layout="responsive"
            width="1440"
            height="845"
            sizes="1000px"
            quality="100"
          />
        </div>
      </div>
    </Layout>
  );
}
