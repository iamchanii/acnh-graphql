import createFilter from './createFilter';

const filterShadow = createFilter((fish, { shadow }) => {
  return shadow ? fish.shadow === shadow : true;
});

export default filterShadow;
