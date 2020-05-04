import { ApolloServer } from 'apollo-server-micro';
import fishes from './data/fish.json';
import { schema } from './schema';

const server = new ApolloServer({
  schema,
  context: {
    fishes,
  },
});

export default server.createHandler();
