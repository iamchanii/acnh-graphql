import { arg, enumType, intArg, queryType } from '@nexus/schema';
import { connectionFromArray } from 'graphql-relay';
import { Fish } from './fish';
import filterFishes from './lib/filterFishes';

export const Hemisphere = enumType({
  name: 'Hemisphere',
  description: '북반구, 남반구',
  members: {
    NORTHERN: 'northern',
    SOUTHERN: 'southern',
  },
});

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
    t.connectionField('fishes', {
      type: Fish,
      additionalArgs: {
        hemisphere: arg({
          type: Hemisphere,
          default: 'northern',
          description: '북반구, 남반구 지정. month 필터 사용시 필요함.',
        }),
        month: intArg({
          description: '출현 기간',
        }),
      },
      resolve: (_, args, ctx) =>
        connectionFromArray(filterFishes(ctx.fishes, args), args) as any,
    });
  },
});
