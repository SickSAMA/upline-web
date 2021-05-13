/* eslint-disable camelcase */
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import React from 'react';

import Layout from '@/components/Layout';
import GET_RESUMES from '@/graphql/getResumes';
import { GetResumes } from '@/graphql/types/GetResumes';
import { resumeEdit } from '@/utils/routes';
import withAuth from '@/utils/withAuth';

import BodyLayout from './components/BodyLayout';

function Resumes(): JSX.Element {
  const { loading, error, data }= useQuery<GetResumes>(GET_RESUMES);

  return (
    <Layout>
      <BodyLayout>
        <h2>Resumes</h2>
        { data?.resumes && data.resumes.map((resume) => (
          <div key={resume.uuid}>
            <Link href={resumeEdit(resume.uuid)}>
              <a target="_blank" rel="noopener">{ resume.resume_name }</a>
            </Link>
            { resume.updated_at }
          </div>
        ))}
      </BodyLayout>
    </Layout>
  );
}

export default withAuth(Resumes);
