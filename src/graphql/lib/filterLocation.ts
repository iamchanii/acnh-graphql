import createFilter from './createFilter';

const filterLocation = createFilter((fish, { location }) => {
  return location ? fish.locations.includes(location) : true;
});

export default filterLocation;
