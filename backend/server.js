const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const path = require("path");

const typeDefs = require("./graphql/typeDefs.gql");
const resolvers = require("./graphql/resolvers");

const app = express();
dotenv.config();
connectDb();
app.use(express.json());

const startApolloServer = async () => {
  // Define our Appolo-Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: true,
  });

  await server.start(); // Start the Apollo Server

  // Use the graphqlUploadExpress middleware
  app.use(graphqlUploadExpress());
  // Apply the Apollo Server GraphQL middleware to Express
  server.applyMiddleware({ app });

  // Serve files from the 'uploads' directory
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  // Define custom route for handling file requests
  app.get("/get-file/:filename", (req, res) => {
    const filename = req.params.filename;
    // Serve the file
    res.sendFile(filename);
  });

  // Define Routes
  app.get("/", (req, res) => {
    res.send("API is running..");
  });

  app.use("/api/users", userRoutes);
  app.use("/api/project", projectRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT;
  app.listen(PORT, console.log(`Server started running on port ${PORT}`));
};

startApolloServer().catch((error) => {
  console.error("Error starting Apollo Server:", error);
});
