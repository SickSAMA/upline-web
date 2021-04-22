/* eslint-disable camelcase */
import React from 'react';

import { ExperienceInput } from '@/graphql/types/graphql-global-types';

import style from '../style.module.scss';

interface ExperienceProps {
  experience: ExperienceInput;
}

function convertStringToList(str: string): JSX.Element | null {
  if (!str) {
    return null;
  }

  const strList = str.split('\n');
  return (
    <ul>
      {
        strList.map((detail, index) => <li key={index}>{ detail }</li>)
      }
    </ul>
  );
}

export default function Experience({ experience }: ExperienceProps): JSX.Element {
  return (
    <div className={style.experience}>
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
          <p className={style['resumeExperience__summary']}>
            { experience.summary && <span>{ experience.summary }</span>}
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
