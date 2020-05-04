import { allPass } from 'remeda/dist/commonjs/allPass';
import { NexusGenArgTypes, NexusGenFieldTypes } from '../../typegen';
import filterHasFin from './filterHasFin';
import filterHasSound from './filterHasSound';
import filterLocation from './filterLocation';
import filterMonth from './filterMonth';
import filterPrice from './filterPrice';
import filterShadow from './filterShadow';

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
      filterHasSound(args),
    ]),
  );
};

export default filterFishes;
