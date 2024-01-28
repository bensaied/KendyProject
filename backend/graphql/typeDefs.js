const { gql } = require("apollo-server");

module.exports = gql`
  type Activite {
    id: ID!
    name: String!
    ref: String!
    date: String!
    sujet: String!
    recommendation: String!
    remarques: String
  }
  scalar Upload
  type Resource {
    id: ID!
    pdfFile: Upload!
    ref: String!
    source: String!
    date: String!
    description: String
    tache: String!
  }
  type ResourceDetails {
    id: ID!
    pdfFile: String!
    ref: String!
    source: String!
    date: String!
    description: String
    tache: String!
  }
  input AdminInput {
    firstname: String!
    name: String!
    grade: String!
  }
  input ModifyProjectInput {
    id: ID!
    name: String!
    admin: [AdminInput]
    source: String!
    benificaire: [String]!
    periodeProject: [String]!
    integration: [String]!
    encryptionType: [String]!
    lengthKey: [String]!
    liaison: [String]!
    KeyDuration: Int!
    description: String!
    partage: String!
  }
  input CreateActiviteInput {
    projectId: ID!
    ref: String!
    date: String!
    sujet: String!
    recommendation: String!
    remarques: String
  }
  input CreateResourceInput {
    projectId: ID!
    pdfFile: Upload!
    ref: String!
    source: String!
    date: String!
    description: String
    tache: String!
  }

  input ModifyActiviteInput {
    projectId: ID!
    activityId: ID!
    name: String!
    ref: String!
    date: String!
    sujet: String!
    recommendation: String!
    remarques: String
  }

  type ProjetUSSCQ {
    id: ID!
    name: String!
    admin: [User!]!
    source: String!
    benificaire: [String]!
    periodeProject: [String]!
    integration: [String]!
    encryptionType: [String]!
    lengthKey: [String]!
    liaison: [String]!
    KeyDuration: Int!
    activite: [Activite!]!
    resource: [ResourceDetails]!
    description: String!
    partage: String!
    createdAt: String!
    updatedAt: String!
  }

  type Version {
    id: ID!
    versionId: String!
    nameVersion: String!
    descriptionVersion: String!
  }
  input CreateVersionInput {
    projectId: ID!
    nameVersion: String!
    descriptionVersion: String!
  }

  type Reseau {
    id: ID!
    namereseau: String!
    # projetreseau: [ProjectLabo!]!
    versionreseau: String!
    typereseau: String!
    referencereseau: String!
    livrablereseau: String!
    durationmission: String!
    benificiairereseau: String!
  }

  type Mission {
    id: ID!
    namemission: String!
    # projetmission: [ProjectLabo!]!
    versionmission: String!
    destination: String!
    referencemission: String!
    formateur: [User!]!
    typeuser: String!
  }

  type Object {
    label: String!
    value: String!
  }

  type ProjectLabo {
    id: ID!
    nameProject: String!
    adminProject: [User!]!
    referenceTypeProject: [Object]!
    livrablesProject: [Object]!
    encryptionTypeProject: [Object]!
    integrationProject: [Object]!
    descriptionProject: String!
    partageProject: String!
    versionProject: [Version]!
    reseauProject: [Reseau]!
    missionProject: [Mission!]!
    statusProject: String!
    docsRetourProject: [String]!
    formateurProject: [User!]!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    firstname: String!
    name: String!
    login: String!
    direction: String!
    grade: String!
    password: String!
    firstConnect: String!
    userType: [String]!
    projectLabo: [ProjectLabo]
    projectQt: [ProjetUSSCQ]
  }
  type ResourceCreationResult {
    success: Boolean!
    message: String
  }
  type Mutation {
    modifyProject(input: ModifyProjectInput!): ProjetUSSCQ!
    createActivite(input: CreateActiviteInput!): Activite!
    createResource(input: CreateResourceInput!): ResourceCreationResult

    createVersion(input: CreateVersionInput!): Version!
    deleteActivite(projectId: ID!, activiteId: ID!): Activite!
    modifyActivite(input: ModifyActiviteInput!): Activite!
  }

  type Query {
    getProjects: [ProjetUSSCQ]
    project(id: ID!): ProjetUSSCQ

    getActivities(projectId: ID!): [Activite]
    getActivity(projectId: ID!, activityId: ID!): Activite

    getProjectsLabo: [ProjectLabo]
    projectLabo(id: ID!): ProjectLabo

    getVersions(projectId: ID!): [Version]
    getVersion(projectId: ID!, versionID: ID!): Version
  }
`;
