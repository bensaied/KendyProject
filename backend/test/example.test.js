const { graphql } = require("graphql");
const { buildSchema } = require("graphql/utilities");
const resolvers = require("../graphql/resolvers");
const typeDefs = require("../graphql/typeDefs.gql");
// test("it should run !", () => {
//   expect(true).toBe(true);
// });

describe("getProjects Query", () => {
  test("Should return an object of projects", async () => {
    // Extract the raw schema string from typeDefs
    const schemaString = typeDefs.loc.source.body;

    // Build the GraphQL schema
    const schema = buildSchema(schemaString);

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
    const response = await graphql(schema, query, resolvers);
    console.log("response", response.data);
    // Assert the response
    expect(response).toBeDefined();
    expect(response.data.getProjects).toBeDefined();
    expect(typeof response.data).toBe("object");
    // expect(response.data).toHaveProperty("name", "ELISSA");
    // Add more specific assertions as needed
  });
});
