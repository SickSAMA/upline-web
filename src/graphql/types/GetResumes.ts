/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetResumes
// ====================================================

export interface GetResumes_resumes {
  __typename: "ResumeOutput";
  uuid: string;
  resume_name: string;
  updated_at: any;
  created_at: any;
}

export interface GetResumes {
  resumes: GetResumes_resumes[];
}
