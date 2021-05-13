import React, { FormEventHandler, useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { Field, Submit } from '@/components/Form';
import IconEdit from '@/components/SVG/edit.svg';

import style from '../style.module.scss';
import { ResumeFormData } from './ResumeEditor';

interface ResumeNameProps {
  control: Control<ResumeFormData>;
  onSave: () => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  isSaving: boolean;
}

type Mode = 'edit' | 'display';

export default function ResumeName({ control, onSave, isSaving }: ResumeNameProps): JSX.Element {
  const { field } = useController({
    name: 'resume_name',
    control,
    rules: { required: true },
  });

  const [mode, setMode] = useState<Mode>('display');

  const onEdit = () => {
    setMode('edit');
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    await onSave();
    setMode('display');
  };

  if (mode === 'display') {
    return (
      <div className={style['header__nameDisplay']}>
        <span>{ field.value }</span>
        <button type="button" onClick={onEdit}>
          <IconEdit />
        </button>
      </div>
    );
  } else {
    return (
      <form onSubmit={onSubmit} className={style['header__nameEdit']}>
        <Field>
          <input type="text" autoFocus {...field} />
        </Field>
        <Submit value="Save" isSubmitting={isSaving} />
      </form>
    );
  }
}
