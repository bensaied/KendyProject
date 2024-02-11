import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    getProjects {
      id
      name
      admin {
        grade
        name
        firstname
      }
      description
      updatedAt
      createdAt
      partage
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($projectId: ID!) {
    project(id: $projectId) {
      id
      name
      admin {
        grade
        name
        firstname
      }
      source
      benificaire
      periodeProject
      integration
      encryptionType
      lengthKey
      liaison
      KeyDuration
      activite {
        id
        name
        # resource {
        #   id
        #   pdfFile
        #   ref
        #   source
        #   date
        #   description
        #   tache
        # }
        date
        sujet
        recommendation
        remarques
      }
      resource {
        id
        pdfFile
        ref
        source
        date
        description
        tache
      }
      description
      partage
      createdAt
      updatedAt
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query GetActivities($projectId: ID!) {
    getActivities(projectId: $projectId) {
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
  }
`;
export const GET_ACTIVITY = gql`
  query GetActivity($projectId: ID!, $activityId: ID!) {
    getActivity(projectId: $projectId, activityId: $activityId) {
      name
      id
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
  }
`;
