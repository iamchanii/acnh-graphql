import { cloneDeep } from 'lodash-es';
import fishes from '../../../data/fish.json';
import filterHasFin from '../filterHasFin';
import { FishType } from './../../../types';

let fish: FishType;

beforeEach(() => {
  fish = cloneDeep(fishes[0]) as FishType;
});

test('args에 hasFin을 사용하지 않으면 true를 반환한다.', () => {
  expect(filterHasFin({})(fish)).toBe(true);
});

test('hasFin를 사용하면 fish hasFin 값을 반환한다.', () => {
  expect(filterHasFin({ hasFin: true })(fish)).toBe(fish.hasFin);
});
