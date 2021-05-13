/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetResume
// ====================================================

export interface GetResume_resume_education {
  __typename: "Experience";
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: string;
}

export interface GetResume_resume_professional_experience {
  __typename: "Experience";
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: string;
}

export interface GetResume_resume_leadership_experience {
  __typename: "Experience";
  entity: string;
  city: string;
  country: string;
  summary: string;
  start_date: string;
  end_date: string;
  details: string;
}

export interface GetResume_resume_others {
  __typename: "Skill";
  key: string;
  value: string;
}

export interface GetResume_resume_styles {
  __typename: "ResumeStyle";
  font_family: string;
  font_size: number;
  line_height: number;
  margin: string;
  header_alignment: string;
}

export interface GetResume_resume {
  __typename: "ResumeOutput";
  uuid: string;
  resume_name: string;
  name: string;
  english_name: string;
  phone: string;
  email: string;
  address: string;
  education: GetResume_resume_education[];
  professional_experience: GetResume_resume_professional_experience[];
  leadership_experience: GetResume_resume_leadership_experience[];
  others: GetResume_resume_others[];
  styles: GetResume_resume_styles;
  updated_at: any;
  created_at: any;
}

export interface GetResume {
  resume: GetResume_resume | null;
}

export interface GetResumeVariables {
  uuid: string;
}
