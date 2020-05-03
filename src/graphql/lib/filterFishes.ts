import { NexusGenArgTypes, NexusGenFieldTypes } from '../../typegen';

const filterFishes = (
  fishes: NexusGenFieldTypes['Fish'][],
  args: NexusGenArgTypes['Query']['fishes'],
) => {
  const { hemisphere, month } = args;

  return fishes.filter((fish) => {
    if (month) {
      return fish[
        hemisphere === 'northern' ? 'northernMonths' : 'southernMonths'
      ].includes(month);
    }

    return true;
  });
};

export default filterFishes;
