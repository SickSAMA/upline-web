import React from 'react';

import Layout from '@/components/Layout';
import withAuth from '@/utils/withAuth';

import BodyLayout from './components/BodyLayout';

function Resumes(): JSX.Element {
  return (
    <Layout>
      <BodyLayout>
        Resumes
      </BodyLayout>
    </Layout>
  );
}

export default withAuth(Resumes);
