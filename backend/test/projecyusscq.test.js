const { graphql } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
// const { buildSchema } = require("graphql/utilities");
const resolvers = require("../graphql/resolvers");
const typeDefs = require("../graphql/typeDefs.gql");
const mongoose = require("mongoose");
const ProjetUSSCQ = require("../models/projectUssqModel");

// //**************** Connect to the MongoDB test database
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/KendyProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Disconnect from the MongoDB test database after all tests are done
afterAll(async () => {
  await mongoose.disconnect();
});

// Create an executable schema using resolvers and type definitions
const schema = makeExecutableSchema({ typeDefs, resolvers });

// //**************** For in memory-data
// // Extract the raw schema string from typeDefs
// const schemaString = typeDefs.loc.source.body;
// // Build the GraphQL schema
// const schema = buildSchema(schemaString);

// Queries Tests
describe("getProjects Query", () => {
  test("Should return an object of projects", async () => {
    // Define the GraphQL query
    const query = `
      query {
        getProjects {
          id
          name
          admin {
            id
            firstname
            name
            grade
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
            ref
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

    // Execute the GraphQL query
    const response = await graphql(schema, query);
    console.log("response", response.data);
    // Assert the response
    console.log("projectUSSCQData", response.data);
    expect(response).toBeDefined();
    expect(response.data.getProjects).toBeDefined();
    expect(typeof response.data).toBe("object");
    expect(
      response.data.getProjects.some((project) => project.name === "ELISSA")
    ).toBe(true);

    // Add more specific assertions as needed
  });
});

// Mutations Tests

describe("deleteRessource Mutation", () => {
  let projectId;
  let resourceId;
  // beforeEach(async () => {
  //   // Set up mocked data for each test
  //   const sampleProject = new ProjetUSSCQ({
  //     _id: {
  //       $oid: "66b650cc594a884f587015ce",
  //     },
  //     name: "ELISSA",
  //     admin: [
  //       {
  //         $oid: "6400adc8b024e12374218a12",
  //       },
  //     ],
  //     source: "Internet",
  //     benificaire: ["EMAT"],
  //     periodeProject: ["2024-01-01T00:00:00", "2024-01-31T00:00:00"],
  //     integration: ["Software"],
  //     encryptionType: ["Asymetrique"],
  //     lengthKey: ["128"],
  //     liaison: ["Internet"],
  //     KeyDuration: 2,
  //     activite: [],
  //     description: "Blabla",
  //     partage: "true",
  //     resource: [
  //       {
  //         pdfFile:
  //           "C:\\Users\\MSI\\Desktop\\Projects\\KendyProject\\backend\\uploads\\ELISSA\\CompTIA-CySA-Study-Guide_-3rd-Edition-9781394182909.pdf",
  //         ref: "554",
  //         source: "DGTI",
  //         date: "2024-03-01",
  //         description: "Rien",
  //         tache: "Suivi",
  //         _id: {
  //           $oid: "65bd09d94c9bad0f942ed461",
  //         },
  //       },
  //       {
  //         pdfFile:
  //           "C:\\Users\\MSI\\Desktop\\Projects\\KendyProject\\backend\\uploads\\ELISSA\\Get_Started_With_Smallpdf.pdf",
  //         ref: "21254",
  //         source: "DGST",
  //         date: "2024-02-09",
  //         description: "blablabla",
  //         tache: "Suivi",
  //         _id: {
  //           $oid: "88beb6b0ac9d2afe3f5bf03u",
  //         },
  //       },
  //     ],
  //     createdAt: {
  //       $date: "2024-01-28T13:04:12.581Z",
  //     },
  //     updatedAt: {
  //       $date: "2024-02-06T15:12:36.835Z",
  //     },
  //     __v: 11,
  //   });

  //   const sampleResource = {
  //     pdfFile:
  //       "C:\\Users\\MSI\\Desktop\\Projects\\KendyProject\\backend\\uploads\\ELISSA\\Get_Started_With_Smallpdf.pdf",
  //     ref: "21254",
  //     source: "DGST",
  //     date: "2024-02-09",
  //     description: "blablabla",
  //     tache: "Suivi",
  //     _id: {
  //       $oid: "88beb6b0ac9d2afe3f5bf03u",
  //     },
  //   };
  //   await sampleProject.save(); // Save the sample project to the database
  //   projectId = sampleProject._id.$oid;
  //   resourceId = sampleResource._id.$oid;
  // });

  test("Should delete a resource from a project", async () => {
    // Define the GraphQL mutation
    const mutation = `
      mutation {
        deleteRessource(projectId: "${projectId}", ressourceId: "${resourceId}") {
        ref
        }
      }
    `;

    // Execute the GraphQL mutation
    const response = await graphql(schema, mutation);

    // Assert the response
    expect(response).toBeDefined();
    console.log("response", response);
    // expect(response.data.deleteRessource).toEqual({ ref: "554" });
    // Add more specific assertions as needed
  });
});

// Test for modify Ressource
describe("modify Ressource Mutation", () => {
  let projectId = "65b650cc594a884f587015ce";
  let resourceId = "65c2ab907aa45502fd8113f9";

  test("Should modify a resource from a project", async () => {
    // Define the GraphQL mutation
    const mutation = `
      mutation {
        modifyRessource(input:{projectId: "${projectId}", ressourceId: "${resourceId}", ref : "2000", source: "EMAA", date: "2024-06-18",description:"" }) {
        ref
        }
      }
    `;

    // Execute the GraphQL mutation
    const response = await graphql(schema, mutation);

    // Assert the response
    expect(response).toBeDefined();
    console.log("response", response);
    expect(response.data.modifyRessource).toEqual({ ref: "2000" });
    // Add more specific assertions as needed
  });
});
