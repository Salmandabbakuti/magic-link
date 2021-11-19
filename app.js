import { GraphQLServer, PubSub } from 'graphql-yoga';
import resolvers from './src/resolvers/index';

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: `${__dirname}/src/schema.graphql`,
  resolvers,
  context(request) {
    return {
      pubsub,
      request
    };
  }
});

server.start(() => console.log('Server is listening at localhost:4000'));
