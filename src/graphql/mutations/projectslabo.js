import { gql } from "@apollo/client";

export const CREATE_VERSION_MUTATION = gql`
  mutation CreateVersion($input: CreateVersionInput!) {
    createVersion(input: $input) {
      nameVersion
    }
  }
`;
