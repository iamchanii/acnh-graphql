import { FishType } from './../../types';
import { NexusGenArgTypes } from '../../typegen';

const sortFishes = (args: NexusGenArgTypes['Query']['fishes']) => (
  a: FishType,
  b: FishType,
): number => {
  const { orderBy } = args;

  if (!orderBy) {
    return 0;
  }

  const [field, sortType] = orderBy.split('_');
  const revision = sortType === 'ASC' ? 1 : -1;

  let result = 0;

  switch (field) {
    case 'name':
      result = a.name > b.name ? 1 : -1;
      break;
    case 'price':
      result = a.price - b.price;
      break;
    case 'hours':
      result = a.hours[0].start - b.hours[0].start;
      break;
    case 'shadow':
      const _a = a.shadow === 'narrow' ? 0 : a.shadow;
      const _b = b.shadow === 'narrow' ? 0 : b.shadow;
      result = _a - _b;
      break;
  }

  return result * revision;
};

export default sortFishes;
