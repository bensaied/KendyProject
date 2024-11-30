import { gql } from "@apollo/client";

export const CREATE_VERSION_MUTATION = gql`
  mutation CreateVersion($input: CreateVersionInput!) {
    createVersion(input: $input) {
      nameVersion
    }
  }
`;
export const MODIFY_PROJECT_LABO_MUTATION = gql`
  mutation ModifyProjectLabo($input: ModifyProjectLaboInput!) {
    modifyProjectLabo(input: $input) {
      id
      nameProject
      adminProject {
        firstname
        name
        grade
      }
      referenceTypeProject {
        label
        value
      }
      livrablesProject {
        label
        value
        checked
      }
      createdAt
      updatedAt

      partageProject
      descriptionProject
      integrationProject {
        label
        value
      }
      encryptionTypeProject {
        label
        value
      }
      statusProject
      formateurProject
    }
  }
`;
