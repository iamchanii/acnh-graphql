import { FishType } from './../../types';
import { NexusGenArgTypes } from '../../typegen';

const compareByName = (a: FishType, b: FishType): number => {
  return a.name > b.name ? 1 : -1;
};

const compareByPrice = (a: FishType, b: FishType): number => {
  return a.price - b.price;
};

const compareByHours = (a: FishType, b: FishType): number => {
  return a.hours[0].start - b.hours[0].start;
};

const compareByShadow = (a: FishType, b: FishType): number => {
  const _a = a.shadow === 'narrow' ? 0 : a.shadow;
  const _b = b.shadow === 'narrow' ? 0 : b.shadow;

  return _a - _b;
};

const compareFunctionMap: {
  [key: string]: (a: FishType, b: FishType) => number;
} = {
  name: compareByName,
  price: compareByPrice,
  hours: compareByHours,
  shadow: compareByShadow,
};

const sortFishes = (args: NexusGenArgTypes['Query']['fishes']) => (
  a: FishType,
  b: FishType,
): number => {
  if (!args.orderBy) {
    return 0;
  }

  const [field, sortType] = args.orderBy.split('_');
  const revision = sortType === 'ASC' ? 1 : -1;

  return compareFunctionMap[field](a, b) * revision;
};

export default sortFishes;
