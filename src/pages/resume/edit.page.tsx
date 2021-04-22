import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import omit from 'rc-util/lib/omit';
import React, { useEffect, useState } from 'react';

import SAVE_RESUME from '@/graphql/saveResume';
import { SaveResume, SaveResumeVariables } from '@/graphql/types/SaveResume';
import ResumeEditor, { ResumeFormData } from '@/pages/resume/components/ResumeEditor';
import { deleteResume, loadResume as loadResumeFromCache } from '@/pages/resume/utils/resumeStore';
import { resumeEdit } from '@/utils/routes';
import useAuth from '@/utils/useAuth';

/**
 * This page is for guests to edit resume
 */
export default function Editor(): JSX.Element | null {
  const [isLogin] = useAuth();
  const [createResume, { error: resumeCreationError, data: resumeCreated }] = useMutation<SaveResume, SaveResumeVariables>(SAVE_RESUME);
  const [resumeToRender, setResumeToRender] = useState<ResumeFormData>();
  const router = useRouter();

  // effect to load resume from cache
  useEffect(() => {
    if (!resumeToRender) {
      /**
       * Render resume loaded from default cache.
       * For login user, this is just a placeholder and later page will redirect
       */
      const resumeFromCache = loadResumeFromCache();
      if (resumeFromCache) {
        const resume = omit(resumeFromCache, ['updated_at']);
        setResumeToRender(resume);
      }
    }
  }, [setResumeToRender, resumeToRender]);

  // effect to create resume
  useEffect(() => {
    if (isLogin && !(resumeCreated || resumeCreationError)) {
      // load resume from default cache
      const resumeFromCache = loadResumeFromCache();
      let resume: ResumeFormData | undefined = undefined;
      if (resumeFromCache) {
        resume = omit(resumeFromCache, ['updated_at']);
      }

      // clear default cache
      deleteResume();

      // create a new resume using default cache
      createResume({ variables: { resumeInput: resume || {} } });
    }
  }, [isLogin, createResume, resumeCreationError, resumeCreated]);

  // effect to redirect to url with uuid after getting resume creation result
  useEffect(() => {
    if (isLogin) {
      if (resumeCreationError) {
        console.error(resumeCreationError);
      }

      if (resumeCreated) {
        // generate the new edit page link with uuid
        const pathWithUuid = resumeEdit(resumeCreated.saveResume.uuid);

        // replay the path (push effect)
        router.replace(pathWithUuid);
      }
    }
  }, [isLogin, resumeCreationError, resumeCreated, router]);

  return <ResumeEditor resume={resumeToRender} />;
}
