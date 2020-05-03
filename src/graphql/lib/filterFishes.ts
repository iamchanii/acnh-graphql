import { NexusGenArgTypes, NexusGenFieldTypes } from '../../typegen';

const filterFishes = (
  fishes: NexusGenFieldTypes['Fish'][],
  args: NexusGenArgTypes['Query']['fishes'],
) => {
  const { hemisphere, month, price } = args;

  return fishes.filter((fish) => {
    let result = true;

    if (
      month &&
      !fish[
        hemisphere === 'northern' ? 'northernMonths' : 'southernMonths'
      ].includes(month)
    ) {
      result = false;
    }

    if (price) {
      if (price.max <= price.min) {
        throw Error('최대 금액은 최소 금액보다 작을 수 없습니다.');
      }

      if (price.max) {
        result = fish.price <= price.max;
      } else if (price.min) {
        result = fish.price >= price.min;
      }
    }

    return result;
  });
};

export default filterFishes;
