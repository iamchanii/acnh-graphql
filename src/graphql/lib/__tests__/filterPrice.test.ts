import { cloneDeep } from 'lodash-es';
import fishes from '../../../data/fish.json';
import { FishType } from '../../../types';
import filterPrice from '../filterPrice';

let fish: FishType;

beforeEach(() => {
  fish = cloneDeep(fishes[0]) as FishType;
});

test('args에 price를 사용하지 않으면 항상 true를 반환한다.', () => {
  expect(filterPrice({})(fish)).toBe(true);
});

test('최소 금액보다 최대 금액이 작은 경우 오류를 발생한다.', () => {
  expect(() =>
    filterPrice({
      price: { min: 200, max: 100 },
    })(fish),
  ).toThrow();
});

test('최소 금액보다 최대 금액이 큰 경우 오류가 발생하지 않는다.', () => {
  expect(() =>
    filterPrice({
      price: { min: 0, max: 100 },
    })(fish),
  ).not.toThrow();
});

test('price.max를 설정한 경우 판매 금액이 설정 금액 이하인 경우 true를 반환한다.', () => {
  fish.price = 1000;

  expect(
    filterPrice({
      price: { max: 1000 },
    })(fish),
  ).toBe(true);
});

test('price.max를 설정한 경우 판매 금액이 설정 금액을 초과한 경우 false를 반환한다.', () => {
  fish.price = 1001;

  expect(
    filterPrice({
      price: { max: 1000 },
    })(fish),
  ).toBe(false);
});

test('price.min를 설정한 경우 판매 금액이 설정 금액 이상인 경우 true를 반환한다.', () => {
  fish.price = 1000;

  expect(
    filterPrice({
      price: { min: 1000 },
    })(fish),
  ).toBe(true);
});

test('price.min를 설정한 경우 판매 금액이 설정 금액을 초과한 경우 false를 반환한다.', () => {
  fish.price = 999;

  expect(
    filterPrice({
      price: { min: 1000 },
    })(fish),
  ).toBe(false);
});

test('max, min 둘 다 설정한 경우 해당 범위 이내에 판매 금액이 지정되었을 때 true를 반환한다.', () => {
  fish.price = 500;

  expect(
    filterPrice({
      price: { min: 500, max: 1500 },
    })(fish),
  ).toBe(true);
});

test('max, min 둘 다 설정한 경우, max 초과하는 판매 금액인 경우 false를 반환한다.', () => {
  fish.price = 1501;

  expect(
    filterPrice({
      price: { min: 500, max: 1500 },
    })(fish),
  ).toBe(false);
});

test('max, min 둘 다 설정한 경우, min 미만의 판매 금액인 경우 false를 반환한다.', () => {
  fish.price = 499;

  expect(
    filterPrice({
      price: { min: 500, max: 1500 },
    })(fish),
  ).toBe(false);
});
