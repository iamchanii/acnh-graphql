import { cloneDeep } from 'lodash-es';
import fishes from '../../../data/fish.json';
import filterMonth from '../filterMonth';
import { FishType } from './../../../types';

let fish: FishType;

beforeEach(() => {
  fish = cloneDeep(fishes[0]) as FishType;
});

test('args에 month를 사용하지 않으면 항상 true를 반환한다.', () => {
  expect(filterMonth({})(fish)).toBe(true);
});

test('북반구 기준으로 month가 포함되지 않는 경우 false를 반환한다.', () => {
  fish.northernMonths = [0];
  expect(filterMonth({ month: 1 })(fish)).toBe(false);
});

test('북반구 기준으로 month가 포함되는 경우 true를 반환한다.', () => {
  fish.northernMonths = [1];
  expect(filterMonth({ month: 1 })(fish)).toBe(true);
});

test('남반구 기준으로 month가 포함되지 않는 경우 false를 반환한다.', () => {
  fish.southernMonths = [0];
  expect(filterMonth({ month: 1, hemisphere: 'southern' })(fish)).toBe(false);
});

test('남반구 기준으로 month가 포함되는 경우 true를 반환한다.', () => {
  fish.southernMonths = [1];
  expect(filterMonth({ month: 1, hemisphere: 'southern' })(fish)).toBe(true);
});
