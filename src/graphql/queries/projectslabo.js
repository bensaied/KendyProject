import { gql } from "@apollo/client";

export const GET_PROJECTS_LABO = gql`
  query GetProjects {
    getProjectsLabo {
      id
      nameProject
      adminProject {
        grade
        name
        firstname
      }
      versionProject {
        id
        nameVersion
        versionId
        descriptionVersion
      }
      descriptionProject
      statusProject
      createdAt
      updatedAt
      partageProject
    }
  }
`;

export const GET_PROJECT_LABO = gql`
  query GetProjectLabo($projectId: ID!) {
    projectLabo(id: $projectId) {
      id
      adminProject {
        firstConnect
        firstname
        direction
        grade
        id
        login
        name
        password
        userType
      }
      createdAt
      descriptionProject
      encryptionTypeProject {
        label
        value
      }
      formateurProject
      integrationProject {
        label
        value
      }
      livrablesProject {
        label
        value
        checked
      }
      missionProject {
        destination
        id
        namemission
        referencemission
        typeuser
        versionmission
        formateur {
          direction
          firstConnect
          firstname
          grade
          id
          login
          password
          name
          userType
        }
      }
      nameProject
      partageProject
      referenceTypeProject {
        label
        value
      }
      reseauProject {
        benificiairereseau
        durationmission
        id
        livrablereseau
        namereseau

        referencereseau
        typereseau
        versionreseau
      }
      statusProject
      updatedAt
      versionProject {
        id
        versionId
        nameVersion
        descriptionVersion
      }
    }
  }
`;

export const GET_VERSIONS = gql`
  query GetVersions($projectId: ID!) {
    getVersions(projectId: $projectId) {
      id
      nameVersion
      versionId
      descriptionVersion
    }
  }
`;
export const GET_VERSION = gql`
  query GetVersion($projectId: ID!, $versionID: ID!) {
    getVersion(projectId: $projectId, versionID: $versionID) {
      id
      nameVersion
      versionId
      descriptionVersion
    }
  }
`;
