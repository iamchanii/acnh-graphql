import createFilter from './createFilter';

const filterHasSound = createFilter((fish, { hasSound }) => {
  return hasSound !== undefined ? fish.hasSound : true;
});

export default filterHasSound;
