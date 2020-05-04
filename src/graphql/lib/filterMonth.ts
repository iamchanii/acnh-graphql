import createFilter from './createFilter';

const filterMonth = createFilter((fish, { month, hemisphere = 'northern' }) => {
  return month
    ? fish[
        hemisphere === 'northern' ? 'northernMonths' : 'southernMonths'
      ].includes(month)
    : true;
});

export default filterMonth;
