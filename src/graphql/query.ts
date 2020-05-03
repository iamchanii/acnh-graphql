import { queryType } from '@nexus/schema';

export const Query = queryType({
  definition(t) {
    t.field('foo', {
      type: 'String',
      resolve: () => 'bar',
    });
  },
});
