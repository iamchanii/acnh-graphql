import { queryType } from '@nexus/schema';
import { Fish } from './fish';

export const Query = queryType({
  definition(t) {
    t.field('foo', {
      type: 'String',
      resolve: () => 'bar',
    });
    t.list.field('fishes', {
      type: Fish,
      description: '전체 물고기 목록을 가져옵니다.',
      resolve: (_, __, ctx) => ctx.fishes,
    });
  },
});
