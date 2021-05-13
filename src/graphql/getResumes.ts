import { gql } from '@apollo/client';

export default gql`
  query GetResumes {
    resumes {
      uuid
      resume_name
      updated_at
      created_at
    }
  }
`;
