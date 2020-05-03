import { allPass } from 'remeda/dist/commonjs/allPass';
import { NexusGenArgTypes, NexusGenFieldTypes } from '../../typegen';

type FilterFn = (
  fish: NexusGenFieldTypes['Fish'],
  args: NexusGenArgTypes['Query']['fishes'],
) => boolean;

const createFilter = (fn: FilterFn) => (
  args: NexusGenArgTypes['Query']['fishes'],
) => (fish: NexusGenFieldTypes['Fish']): boolean => {
  return fn(fish, args);
};

const filterMonth = createFilter((fish, { month, hemisphere }) => {
  return month
    ? fish[
        hemisphere === 'northern' ? 'northernMonths' : 'southernMonths'
      ].includes(month)
    : true;
});

const filterPrice = createFilter((fish, { price }) => {
  if (price) {
    if (price.max <= price.min) {
      throw Error('최대 금액은 최소 금액보다 작을 수 없습니다.');
    }

    if (price.max) {
      return fish.price <= price.max;
    } else if (price.min) {
      return fish.price >= price.min;
    }
  }

  return true;
});

const filterLocation = createFilter((fish, { location }) => {
  return location ? fish.locations.includes(location) : true;
});

const filterShadow = createFilter((fish, { shadow }) => {
  return shadow ? fish.shadow === shadow : true;
});

const filterHasFin = createFilter((fish, { hasFin }) => {
  return hasFin ? fish.hasFin : true;
});

const filterFishes = (
  fishes: NexusGenFieldTypes['Fish'][],
  args: NexusGenArgTypes['Query']['fishes'],
) => {
  return fishes.filter(
    allPass([
      filterMonth(args),
      filterPrice(args),
      filterLocation(args),
      filterShadow(args),
      filterHasFin(args),
    ]),
  );
};

export default filterFishes;
