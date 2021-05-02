const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const LaunchAPI = require("./launch");
const resolvers = require("./resolver");

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  dataSources: () => ({ launchAPI: new LaunchAPI() }),
});

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
  `);
});
