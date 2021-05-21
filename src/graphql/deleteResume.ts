import { gql } from '@apollo/client';

export default gql`
  mutation DeleteResume($uuid: String!) {
    deleteResume(uuid: $uuid)
  }
`;
