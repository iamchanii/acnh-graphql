import {
  arg,
  booleanArg,
  enumType,
  idArg,
  inputObjectType,
  intArg,
  queryType,
} from '@nexus/schema';
import { connectionFromArray } from 'graphql-relay';
import { Fish, FishLoaction, FishShadow } from './fish';
import filterFishes from './lib/filterFishes';
import sortFishes from './lib/sortFishes';

export const Hemisphere = enumType({
  name: 'Hemisphere',
  description: '북반구, 남반구',
  members: {
    NORTHERN: 'northern',
    SOUTHERN: 'southern',
  },
});

export const PriceInputType = inputObjectType({
  name: 'PriceInputType',
  definition(t) {
    t.int('min');
    t.int('max');
  },
});

export const FishOrderByInput = enumType({
  name: 'FishOrderByInput',
  members: [
    'name_ASC',
    'name_DESC',
    'price_ASC',
    'price_DESC',
    'hours_ASC',
    'hours_DESC',
    'shadow_ASC',
    'shadow_DESC',
  ],
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
        id: idArg({
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
        price: PriceInputType.asArg(),
        location: arg({
          type: FishLoaction,
        }),
        shadow: arg({
          type: FishShadow,
        }),
        hasFin: booleanArg(),
        hasSound: booleanArg(),
        orderBy: arg({
          type: FishOrderByInput,
        }),
      },
      resolve: (_, args, ctx) =>
        connectionFromArray(
          ctx.fishes.filter(filterFishes(args)).sort(sortFishes(args)),
          args,
        ) as any,
      extendConnection(t) {
        t.int('totalCount', {
          resolve: (_, __, ctx) => ctx.fishes.length,
        });
      },
    });
  },
});
