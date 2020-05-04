import createFilter from './createFilter';

const filterPrice = createFilter((fish, { price }) => {
  if (!price) {
    return true;
  } else if (price.max && !price.min && fish.price <= price.max) {
    return true;
  } else if (price.min && !price.max && fish.price >= price.min) {
    return true;
  } else {
    if (price.max! < price.min!) {
      throw Error('최대 금액은 최소 금액보다 작을 수 없습니다.');
    }

    if (fish.price < price.min!) {
      return false;
    } else if (fish.price > price.max!) {
      return false;
    }

    return true;
  }
});

export default filterPrice;
