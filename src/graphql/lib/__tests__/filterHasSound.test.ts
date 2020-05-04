import { cloneDeep } from 'lodash-es';
import fishes from '../../../data/fish.json';
import filterHasSound from '../filterHasSound';
import { FishType } from './../../../types';

let fish: FishType;

beforeEach(() => {
  fish = cloneDeep(fishes[0]) as FishType;
});

test('args에 hasSound을 사용하지 않으면 true를 반환한다.', () => {
  expect(filterHasSound({})(fish)).toBe(true);
});

test('hasSound를 사용하면 fish hasSound 값을 반환한다.', () => {
  expect(filterHasSound({ hasSound: true })(fish)).toBe(fish.hasSound);
});
