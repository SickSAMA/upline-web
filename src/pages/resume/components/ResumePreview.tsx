import React, { MutableRefObject, useEffect, useRef, useState } from 'react';

import style from '../style.module.scss';
import { HeaderAlignment } from '../utils/styleOptionUtil';
import Experience from './ExperiencePreview';
import { ResumeFormData } from './ResumeEditor';

interface ResumePreviewProps {
  resume: ResumeFormData;
  isOnePage: MutableRefObject<boolean>;
}

export default function ResumePreview({ resume, isOnePage }: ResumePreviewProps): JSX.Element | null {
  const resumeEl = useRef<HTMLDivElement>(null);
  const [isOverOnePage, setIsOverOnePage] = useState(false);

  const marginArr = resume.styles.margin.split(' ').map((m) => m + 'pt');
  marginArr.push(marginArr.shift() as string);

  const resumeStyles = {
    fontFamily: resume.styles.font_family,
    fontSize: `${resume.styles.font_size}pt`,
    lineHeight: resume.styles.line_height,
    padding: marginArr.join(' '),
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (resumeEl?.current) {
      if (resumeEl.current.scrollHeight > resumeEl.current.clientHeight && !isOverOnePage) {
        setIsOverOnePage(true);
        isOnePage.current = false;
      }
      if (resumeEl.current.scrollHeight <= resumeEl.current.clientHeight && isOverOnePage) {
        setIsOverOnePage(false);
        isOnePage.current = true;
      }
    }
  });

  return (
    <div ref={resumeEl} className={style.resume} style={resumeStyles}>
      <div className={style['resume__header']} style={{ textAlign: resume.styles.header_alignment as HeaderAlignment }}>
        {
          (resume.name || resume.english_name) &&
            <h2 style={{ fontSize: `${resume.styles.font_size + 1}pt` }}>
              { [resume.name, resume.english_name].filter((s) => s).join(', ')}
            </h2>
        }
        {
          (resume.phone || resume.email) &&
            <p>
              { resume.phone && <><b>Phone:</b> {resume.phone}</> }
              { (resume.phone && resume.email) && ' ' }
              { resume.email && <><b>Email:</b> {resume.email}</> }
            </p>
        }
        {
          resume.address &&
            <p><b>Address:</b> {resume.address}</p>
        }
      </div>

      {
        resume.education.length > 0 &&
          <>
            <br />
            <div className={style['resumeSection']}>
              <p className={style['resumeSection__header']}>Education</p>
              {
                resume.education.map((experience, index) => (
                  <Experience key={index} experience={experience} index={index} />
                ))
              }
            </div>
          </>
      }

      {
        resume.professional_experience.length > 0 &&
          <>
            <br />
            <div className={style['resumeSection']}>
              <p className={style['resumeSection__header']}>Professional Experience</p>
              {
                resume.professional_experience.map((experience, index) => (
                  <Experience key={index} experience={experience} index={index} />
                ))
              }
            </div>
          </>
      }

      {
        resume.leadership_experience.length > 0 &&
          <>
            <br />
            <div className={style['resumeSection']}>
              <p className={style['resumeSection__header']}>Leadership & Extracurricular Activities</p>
              {
                resume.leadership_experience.map((experience, index) => (
                  <Experience key={index} experience={experience} index={index} />
                ))
              }
            </div>
          </>
      }

      {
        resume.others.length > 0 &&
          <>
            <br />
            <div className={style['resumeSection']}>
              <p className={style['resumeSection__header']}>Others</p>
              {
                resume.others.map((skill, index) => (
                  <p key={index}>
                    { skill.key && <b>{ skill.key }</b> }
                    { (skill.key && skill.value) && <b>: </b> }
                    { skill.value ?? '' }
                  </p>
                ))
              }
            </div>
          </>
      }
      {
        isOverOnePage &&
          <div className={style['resume__overlay']} style={{ height: marginArr[2] }}>
            <p>Please keep your resume within one page.</p>
          </div>
      }
    </div>
  );
}
