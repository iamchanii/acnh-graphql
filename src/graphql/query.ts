import { queryType, intArg } from '@nexus/schema';
import { Fish } from './fish';

export const Query = queryType({
  definition(t) {
    t.field('foo', {
      type: 'String',
      resolve: () => 'bar',
    });
    t.field('fish', {
      type: Fish,
      description: '특정 물고기 정보를 가져옵니다.',
      args: {
        id: intArg({
          required: true,
          description: '물고기 ID',
        }),
      },
      resolve: (_, { id }, ctx) => {
        const result = ctx.fishes.find((fish) => fish.id === id);

        if (!result) {
          throw Error(`${id}에 해당하는 물고기가 없습니다.`);
        }

        return result;
      },
    });
    t.list.field('fishes', {
      type: Fish,
      description: '전체 물고기 목록을 가져옵니다.',
      resolve: (_, __, ctx) => ctx.fishes,
    });
  },
});
