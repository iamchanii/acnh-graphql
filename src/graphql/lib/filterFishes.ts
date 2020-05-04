import { allPass } from 'remeda/dist/commonjs/allPass';
import { NexusGenArgTypes } from '../../typegen';
import filterHasFin from './filterHasFin';
import filterHasSound from './filterHasSound';
import filterLocation from './filterLocation';
import filterMonth from './filterMonth';
import filterPrice from './filterPrice';
import filterShadow from './filterShadow';

const filterFishes = (args: NexusGenArgTypes['Query']['fishes']) => {
  return allPass([
    filterMonth(args),
    filterPrice(args),
    filterLocation(args),
    filterShadow(args),
    filterHasFin(args),
    filterHasSound(args),
  ]);
};

export default filterFishes;
