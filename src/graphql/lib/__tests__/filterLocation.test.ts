import { cloneDeep } from 'lodash-es';
import fishes from '../../../data/fish.json';
import filterLocation from '../filterLocation';
import { FishType } from './../../../types';

let fish: FishType;

beforeEach(() => {
  fish = cloneDeep(fishes[0]) as FishType;
});

test('args에 location을 사용하지 않으면 항상 true를 반환한다.', () => {
  expect(filterLocation({})(fish)).toBe(true);
});

test('입력한 location이 포함된 경우 true를 반환한다.', () => {
  fish.locations = ['clifftop'];

  expect(filterLocation({ location: 'clifftop' })(fish)).toBe(true);
});

test('입력한 location이 포함되지 않은 경우 false를 반환한다.', () => {
  fish.locations = ['clifftop'];

  expect(filterLocation({ location: 'ocean' })(fish)).toBe(false);
});
