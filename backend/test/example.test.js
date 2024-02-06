const { graphql } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("../graphql/resolvers");
const typeDefs = require("../graphql/typeDefs.gql");
const mongoose = require("mongoose");

// Connect to the MongoDB test database
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

describe("getProjects Query", () => {
  test("Should return an object of projects", async () => {
    // // Extract the raw schema string from typeDefs
    // // const schemaString = typeDefs.loc.source.body;

    // // Build the GraphQL schema
    // // const schema = buildSchema(schemaString);

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

    // Add more specific assertions as needed
  });
});
