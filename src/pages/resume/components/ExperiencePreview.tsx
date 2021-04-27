/* eslint-disable camelcase */
import React from 'react';

import { ExperienceInput } from '@/graphql/types/graphql-global-types';
import { splitStringByNewline } from '@/utils/stringUtil';

import style from '../style.module.scss';

interface ExperiencePreviewProps {
  experience: ExperienceInput;
  index: number;
}

function convertStringToList(str: string): JSX.Element | null {
  if (!str) {
    return null;
  }

  const strList = splitStringByNewline(str);
  return (
    <ul>
      {
        strList.map((detail, index) => <li key={index}>{ detail }</li>)
      }
    </ul>
  );
}

export default function ExperiencePreview({ experience, index }: ExperiencePreviewProps): JSX.Element {
  return (
    <div className={style.resumeExperience}>
      { index > 0 && <br />}
      {
        (experience.entity || experience.city || experience.country) &&
          <p className={style['resumeExperience__entity']}>
            { experience.entity && <span>{ experience.entity }</span>}
            {
              (experience.city || experience.country) &&
                <span>
                  { [experience.city, experience.country].filter((s) => s).join(', ')}
                </span>
            }
          </p>
      }
      {
        (experience.summary || experience.start_date || experience.end_date) &&
          <p className={style['resumeExperience__summaryLine']}>
            { experience.summary && <span className={style['resumeExperience__summary']}>{ experience.summary }</span>}
            {
              (experience.start_date || experience.end_date) &&
                <span>
                  { [experience.start_date, experience.end_date].filter((s) => s).join(' - ')}
                </span>
            }
          </p>
      }
      { convertStringToList(experience.details) }
    </div>
  );
}
