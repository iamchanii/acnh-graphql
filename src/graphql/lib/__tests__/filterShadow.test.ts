import { cloneDeep } from 'lodash-es';
import fishes from '../../../data/fish.json';
import filterShadow from '../filterShadow';
import { FishType } from './../../../types';

let fish: FishType;

beforeEach(() => {
  fish = cloneDeep(fishes[0]) as FishType;
});

test('args에 shadow를 사용하지 않으면 true를 반환한다.', () => {
  expect(filterShadow({})(fish)).toBe(true);
});

test('fish shadow와 args shadow가 일치하면 true를 반환한다.', () => {
  fish.shadow = 1;
  expect(filterShadow({ shadow: 1 })(fish)).toBe(true);
});

test('fish shadow와 args shadow가 일치하지 않으면 false를 반환한다.', () => {
  fish.shadow = 'narrow';
  expect(filterShadow({ shadow: 1 })(fish)).toBe(false);
});
