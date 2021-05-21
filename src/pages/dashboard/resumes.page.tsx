/* eslint-disable camelcase */
import { useLazyQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';

import Layout from '@/components/Layout';
import { NoticeModal } from '@/components/Modal';
import GET_RESUMES from '@/graphql/getResumes';
import { GetResumes } from '@/graphql/types/GetResumes';
import { parseApolloError } from '@/utils/parseError';
import withAuth from '@/utils/withAuth';

import BodyLayout from './components/BodyLayout';
import Resume from './components/Resume';
import style from './style.module.scss';


function Resumes(): JSX.Element {
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [loadResumes, { loading, error, data, refetch }]= useLazyQuery<GetResumes>(GET_RESUMES, {
    onError() {
      setIsNoticeModalOpen(true);
    },
  });

  // load resumes on did mount
  useEffect(() => {
    loadResumes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onNoticeModalClose = useCallback(() => {
    setIsNoticeModalOpen(false);
  }, []);

  return (
    <Layout>
      <BodyLayout>
        <h2>Resumes</h2>
        {
          (loading) ?
            (
              <div className={style.resumeLoading} />
            ) :
            (
              <div className={style.resumeContainer}>
                { data?.resumes && data.resumes.map((resume) => (
                  <Resume key={resume.uuid} resume={resume} reload={refetch} />
                ))}
              </div>
            )
        }
        <NoticeModal
          isOpen={isNoticeModalOpen}
          type="error"
          message={parseApolloError(error)}
          onClose={onNoticeModalClose}
        />
      </BodyLayout>
    </Layout>
  );
}

export default withAuth(Resumes);
