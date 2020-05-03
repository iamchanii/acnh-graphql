import { objectType, enumType } from '@nexus/schema';

export const FishLoaction = enumType({
  name: 'FishLocation',
  description: '물고기 출현 장소',
  members: {
    RIVER: 'river',
    CLIFFTOP: 'clifftop',
    MOUTH: 'mouth',
    POND: 'pond',
    OCEAN: 'ocean',
    PIER: 'pier',
  },
});

export const FishShadow = enumType({
  name: 'FishShadow',
  description: '물고기 그림자',
  members: {
    NARROW: 'narrow',
    XSMALL: 1,
    SMALL: 2,
    MEDIUM: 3,
    LARGE: 4,
    XLARGE: 5,
    XXLARGE: 6,
  },
});

export const Hour = objectType({
  name: 'Hour',
  description: '출현 시간',
  definition(t) {
    t.int('start');
    t.int('end');
  },
});

export const Fish = objectType({
  name: 'Fish',
  description: '물고기',
  definition(t) {
    t.id('id');
    t.string('name', {
      description: '이름',
    });
    t.int('price', {
      description: '판매 금액',
    });
    t.list.field('locations', {
      type: FishLoaction,
      description: '출현 장소',
    });
    t.field('shadow', {
      type: FishShadow,
      description: '그림자 크기',
    });
    t.boolean('hasFin', {
      description: '지느러미 유무',
    });
    t.boolean('hasSound', {
      description: '울음소리 유무',
    });
    t.boolean('onlyRaining', {
      description: '비 또는 눈오는 날에만 출현 유무',
    });
    t.list.field('hours', {
      type: Hour,
      description: '출현 시간',
    });
    t.list.int('northernMonths', {
      description: '북반구 기준 출현 기간',
    });
    t.list.int('southernMonths', {
      description: '남반구 기준 출현 기간',
    });
  },
});
