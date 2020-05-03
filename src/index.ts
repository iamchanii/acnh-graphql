import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import fishes from './data/fish.json';

const server = new ApolloServer({
  schema,
  context: {
    fishes,
  },
});

const port = process.env.PORT || 4000;

server.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  ),
);
