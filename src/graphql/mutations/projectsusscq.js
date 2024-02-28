import { gql } from "@apollo/client";

export const MODIFY_PROJECT_MUTATION = gql`
  mutation ModifyProject($input: ModifyProjectInput!) {
    modifyProject(input: $input) {
      id
      KeyDuration
      activite {
        id
        name
        resource {
          id
          pdfFile
          ref
          source
          date
          description
          tache
        }
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
      resourceRef
    }
  }
`;

export const MODIFY_RESOURCE_MUTATION = gql`
  mutation ModifyResource($input: ModifyRessourceInput!) {
    modifyRessource(input: $input) {
      ref
      source
      date
      description
    }
  }
`;

export const DELETE_RESSOURCE_MUTATION = gql`
  mutation deleteRessource($projectId: ID!, $ressourceId: ID!) {
    deleteRessource(projectId: $projectId, ressourceId: $ressourceId) {
      id
    }
  }
`;

export const CREATE_ACTIVITE_MUTATION = gql`
  mutation CreateActivite($input: CreateActiviteInput!) {
    createActivite(input: $input) {
      id
      name
    }
  }
`;

export const MODIFY_ACTIVITE_MUTATION = gql`
  mutation ModifyActivite($input: ModifyActiviteInput!) {
    modifyActivite(input: $input) {
      id
      name
      resource
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

export const CREATE_RESPONSE_MUTATION = gql`
  mutation CreateResponse($input: CreateResponseInput!) {
    createResponse(input: $input) {
      id
      name
    }
  }
`;
export const MODIFY_RESPONSE_MUTATION = gql`
  mutation modifyResponse($input: ModifyResponseInput!) {
    modifyResponse(input: $input) {
      id
      name
      resource
      degre
      description
      dateLimite
      etat
    }
  }
`;
