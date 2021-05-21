/* eslint-disable camelcase */
import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { MouseEventHandler, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import Dropdown from '@/components/Dropdown';
import { Field, Submit } from '@/components/Form';
import { ContainerModal, NoticeModal } from '@/components/Modal';
import IconDelete from '@/components/SVG/bin.svg';
import IconEdit from '@/components/SVG/edit.svg';
import IconEllipsis from '@/components/SVG/ellipsis.svg';
import DELETE_RESUME from '@/graphql/deleteResume';
import SAVE_RESUME from '@/graphql/saveResume';
import { DeleteResume, DeleteResumeVariables } from '@/graphql/types/DeleteResume';
import { GetResumes_resumes } from '@/graphql/types/GetResumes';
import { SaveResume, SaveResumeVariables } from '@/graphql/types/SaveResume';
import { parseApolloError } from '@/utils/parseError';
import { resumeEdit } from '@/utils/routes';

import style from '../style.module.scss';

interface ResumeProps {
  resume: GetResumes_resumes;
  reload?: () => Promise<any>; // eslint-disable-line
}

interface RenameFormData {
  resume_name: string;
}

dayjs.extend(relativeTime);

export default function Resume({ resume, reload }: ResumeProps): JSX.Element {
  const [deleteResume, { loading: isDeletingResume, error: deleteResumeError }] =
    useMutation<DeleteResume, DeleteResumeVariables>(DELETE_RESUME, {
      onCompleted() {
        if (reload) {
          reload();
        }
      },
      onError() {
        setIsNoticeModalOpen(true);
      },
    });
  const [saveResume, { error: saveResumeError }] = useMutation<SaveResume, SaveResumeVariables>(
      SAVE_RESUME, {
        onCompleted() {
          if (reload) {
            reload();
          }
          setIsContainerModalOpen(false);
        },
        onError() {},
      });

  const { register, formState: { errors: renameFormErrors, isSubmitting: isRenamingResume }, handleSubmit, setFocus } =
    useForm<RenameFormData>({
      defaultValues: {
        resume_name: resume.resume_name,
      },
    });

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isContainerModalOpen, setIsContainerModalOpen] = useState(false);

  const goToEdit: MouseEventHandler = (e) => {
    if (isDeletingResume) {
      e.preventDefault();
    }
  };

  const onRename = handleSubmit((data) => {
    return saveResume({
      variables: {
        resumeInput: {
          uuid: resume.uuid,
          resume_name: data.resume_name,
        },
      },
    });
  });
  // open modal focus

  const onNoticeModalClose = useCallback(() => {
    setIsNoticeModalOpen(false);
  }, []);

  const onContainerModalClose = useCallback(() => {
    setIsContainerModalOpen(false);
  }, []);

  const onAfterContainerModalOpen = useCallback(() => {
    setFocus('resume_name');
  }, [setFocus]);

  return (
    <div className={style['resume__wrapper']}>
      <a className={style.resume} href={resumeEdit(resume.uuid)} target="_blank" rel="noopener noreferrer" onClick={goToEdit}>
        <p>{ resume.resume_name }</p>
        <p>Modified: { dayjs(resume.updated_at).fromNow() }</p>
      </a>
      <Dropdown
        className={style['resume__actions']}
        button={<IconEllipsis />}
        menu={[
          {
            text: (
              <div className={style['resume__action']}>
                <IconEdit />
                <span>Rename</span>
              </div>
            ),
            onClick: () => {
              setIsContainerModalOpen(true);
            },
          },
          {
            text: (
              <div className={style['resume__action']}>
                <IconDelete />
                <span>Delete</span>
              </div>
            ),
            onClick: () => {
              if (!isDeletingResume) {
                deleteResume({ variables: { uuid: resume.uuid } });
              }
            },
          },
        ]}
      />
      {
        isDeletingResume && <div className={style['resume__loading']} />
      }
      <NoticeModal
        isOpen={isNoticeModalOpen}
        type="error"
        message={parseApolloError(deleteResumeError)}
        onClose={onNoticeModalClose}
      />
      <ContainerModal
        isOpen={isContainerModalOpen}
        onClose={onContainerModalClose}
        onAfterOpen={onAfterContainerModalOpen}
      >
        <div className={style.resumeRenameModal}>
          <form onSubmit={onRename}>
            <h2>Resume name</h2>
            <Field error={renameFormErrors.resume_name?.message || parseApolloError(saveResumeError)}>
              <input type="text" {...register('resume_name', { required: 'Resume name can not be empty.' })} />
            </Field>
            <Submit className={style['resumeRenameModal__continue']} isSubmitting={isRenamingResume} value="Continue" />
            <button type="button" className={style['resumeRenameModal__cancel']} onClick={onContainerModalClose}>
              Cancel
            </button>
          </form>
        </div>
      </ContainerModal>
    </div>
  );
}
