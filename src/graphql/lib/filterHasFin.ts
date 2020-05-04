import createFilter from './createFilter';

const filterHasFin = createFilter((fish, { hasFin }) => {
  return hasFin ? fish.hasFin : true;
});

export default filterHasFin;
