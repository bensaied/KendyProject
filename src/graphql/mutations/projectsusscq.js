import { gql } from "@apollo/client";

export const MODIFY_PROJECT_MUTATION = gql`
  mutation ModifyProject($input: ModifyProjectInput!) {
    modifyProject(input: $input) {
      id
      KeyDuration
      activite {
        id
        name
        ref
        date
        sujet
        recommendation
        remarques
      }
      benificaire
      createdAt
      description
      encryptionType
      integration
      lengthKey
      liaison
      name
      partage
      periodeProject
      source
      updatedAt
      admin {
        firstname
        name
      }
    }
  }
`;
export const CREATE_RESOURCE_MUTATION = gql`
  mutation CreateResource($input: CreateResourceInput!) {
    createResource(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_ACTIVITE_MUTATION = gql`
  mutation CreateActivite($input: CreateActiviteInput!) {
    createActivite(input: $input) {
      id
      name
      ref
      date
      sujet
      recommendation
      remarques
    }
  }
`;

export const MODIFY_ACTIVITE_MUTATION = gql`
  mutation ModifyActivite($input: ModifyActiviteInput!) {
    modifyActivite(input: $input) {
      name
      ref
      date
      sujet
      recommendation
      remarques
    }
  }
`;

export const DELETE_ACTIVITE_MUTATION = gql`
  mutation deleteActivite($projectId: ID!, $activiteId: ID!) {
    deleteActivite(projectId: $projectId, activiteId: $activiteId) {
      id
    }
  }
`;
