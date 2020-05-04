import { allPass } from 'remeda/dist/commonjs/allPass';
import { NexusGenArgTypes } from '../../typegen';
import { FishType } from './../../types';
import filterHasFin from './filterHasFin';
import filterHasSound from './filterHasSound';
import filterLocation from './filterLocation';
import filterMonth from './filterMonth';
import filterPrice from './filterPrice';
import filterShadow from './filterShadow';

const filterFishes = (
  fishes: FishType[],
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
