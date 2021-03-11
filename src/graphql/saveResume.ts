import { gql } from '@apollo/client';

export default gql`
  mutation SaveResume($resumeInput: ResumeInput!) {
    saveResume(resume: $resumeInput) {
      uuid
    }
  }
`;
