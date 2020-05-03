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

export default createFilter;
