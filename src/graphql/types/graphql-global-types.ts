/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface ExperienceInput {
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: string;
}

export interface FeedbackInput {
  name: string;
  email: string;
  message: string;
}

export interface ResumeInput {
  uuid?: string | null;
  resume_name?: string | null;
  name?: string | null;
  english_name?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  education?: ExperienceInput[] | null;
  professional_experience?: ExperienceInput[] | null;
  leadership_experience?: ExperienceInput[] | null;
  others?: SkillInput[] | null;
  styles?: ResumeStyleInput | null;
}

export interface ResumeStyleInput {
  font_family: string;
  font_size: number;
  line_height: number;
  margin: string;
  header_alignment: string;
}

export interface SkillInput {
  key: string;
  value: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
