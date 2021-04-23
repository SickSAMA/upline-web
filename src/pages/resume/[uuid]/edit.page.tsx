import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import omit from 'rc-util/lib/omit';
import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { ErrorModal } from '@/components/Modal';
import GET_RESUME from '@/graphql/getResume';
import SAVE_RESUME from '@/graphql/saveResume';
import { GetResume } from '@/graphql/types/GetResume';
import { SaveResume, SaveResumeVariables } from '@/graphql/types/SaveResume';
import ResumeEditor, { ResumeFormData } from '@/pages/resume/components/ResumeEditor';
import { loadResume as loadResumeFromCache, saveResume as saveResumeToCache } from '@/pages/resume/utils/resumeStore';
import { checkErrorCode } from '@/utils/apolloErrorUtil';
import getRouterQueryValue from '@/utils/getRouterQueryValue';
import { HOME, LOGIN } from '@/utils/routes';
import useAuth from '@/utils/useAuth';

export default function Editor(): JSX.Element | null {
  const [isLogin, loading] = useAuth();
  const [uuid, setUuid] = useState<string>();
  const [loadResumeFromServer, { error: resumeLoadingError, data: resumeFromServer }]= useLazyQuery<GetResume>(GET_RESUME, {
    variables: {
      uuid,
    },
    onCompleted(data) {
      const _resumeFromServer = data.resume;
      if (_resumeFromServer) {
        // load resume from cache
        const resumeFromCache = loadResumeFromCache(uuid);

        let resume: ResumeFormData;
        if (resumeFromCache && new Date(resumeFromCache.updated_at).getTime() > new Date(_resumeFromServer.updated_at).getTime()) {
          // use resume from cache if it's lastest
          resume = omit(resumeFromCache, ['updated_at']);
          saveResumeToServer({ variables: { resumeInput: resume } });
        } else {
          resume = omit(_resumeFromServer, ['__typename', 'updated_at', 'created_at']);
          saveResumeToCache(resume);
        }
        setResumeToRender(resume);
      }
    },
    onError(error) {
      console.error(error.message);
    },
  });
  const [saveResumeToServer]= useMutation<SaveResume, SaveResumeVariables>(SAVE_RESUME, {
    onError(error) {
      console.error(error);
    },
  });
  const [resumeToRender, setResumeToRender] = useState<ResumeFormData>();
  const router = useRouter();

  // get uuid
  useEffect(() => {
    const _uuid = getRouterQueryValue(router, 'uuid');
    if (_uuid) {
      setUuid(_uuid);
    }
  }, [router, setUuid]);

  // effect to redirect to login page if guest
  useEffect(() => {
    if (!loading && !isLogin && router.asPath) {
      router.push(`${LOGIN}?redirect=${router.asPath}`);
    }
  }, [router, isLogin, loading]);

  // effect to load resume from server
  useEffect(() => {
    if (uuid && isLogin && !resumeLoadingError && (resumeFromServer?.resume?.uuid !== uuid)) {
      loadResumeFromServer();
    }
  }, [loadResumeFromServer, uuid, isLogin, resumeLoadingError, resumeFromServer]);

  const onErrorModalButtonClicked: MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    router.push(HOME);
  }, [router]);

  const isBadUserInput = checkErrorCode(resumeLoadingError, 'BAD_USER_INPUT');

  return (
    <>
      <ResumeEditor resume={resumeToRender} />
      <ErrorModal
        isOpen={!!resumeLoadingError}
        title={isBadUserInput ? 'Resume not found' : ''}
        message={isBadUserInput ? 'Please make sure the link is correct' : 'Please try again later'}
        buttonText="Go to home page"
        onButtonClicked={onErrorModalButtonClicked}
      />
    </>
  );
}
