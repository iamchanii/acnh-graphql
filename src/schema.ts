import { makeSchema, connectionPlugin } from '@nexus/schema';
import path from 'path';
import * as allTypes from './graphql';

export const schema = makeSchema({
  types: allTypes,
  outputs: {
    schema: path.join(__dirname, '../schema.graphql'),
    typegen: path.join(__dirname.replace(/\/dist$/, '/src'), './typegen.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname.replace(/\/dist$/, '/src'), './types.ts'),
        alias: 'api',
      },
    ],
    contextType: 'api.ContextType',
  },
  plugins: [connectionPlugin()],
});
