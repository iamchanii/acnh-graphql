import { FishType } from './../../../types';
import fishes from '../../../data/fish.json';
import { cloneDeep } from 'lodash-es';
import sortFishes from '../sortFishes';

let fishA: FishType;
let fishB: FishType;

beforeEach(() => {
  fishA = cloneDeep(fishes[0]) as FishType;
  fishB = cloneDeep(fishes[1]) as FishType;
});

describe('name', () => {
  beforeEach(() => {
    fishA.name = '가물치';
    fishB.name = '실러캔스';
  });

  test('이름을 오름차순으로 정렬할 수 있다.', () => {
    const result = [fishA, fishB].sort(sortFishes({ orderBy: 'name_ASC' }));

    expect(result[0]).toBe(fishA);
    expect(result[1]).toBe(fishB);
  });

  test('이름을 내림차순으로 정렬할 수 있다.', () => {
    const result = [fishA, fishB].sort(sortFishes({ orderBy: 'name_DESC' }));

    expect(result[0]).toBe(fishB);
    expect(result[1]).toBe(fishA);
  });
});

describe('price', () => {
  beforeEach(() => {
    fishA.price = 1000;
    fishB.price = 15000;
  });

  test('가격 오름차순으로 정렬할 수 있다.', () => {
    const result = [fishA, fishB].sort(sortFishes({ orderBy: 'price_ASC' }));

    expect(result[0]).toBe(fishA);
    expect(result[1]).toBe(fishB);
  });

  test('가격 내림차순으로 정렬할 수 있다.', () => {
    const result = [fishA, fishB].sort(sortFishes({ orderBy: 'price_DESC' }));

    expect(result[0]).toBe(fishB);
    expect(result[1]).toBe(fishA);
  });
});

describe('hours', () => {
  beforeEach(() => {
    fishA.hours = [{ start: 0, end: 23 }];
    fishB.hours = [{ start: 16, end: 21 }];
  });

  test('출현 시간 오름차순으로 정렬할 수 있다.', () => {
    const result = [fishA, fishB].sort(sortFishes({ orderBy: 'hours_ASC' }));

    expect(result[0]).toBe(fishA);
    expect(result[1]).toBe(fishB);
  });

  test('출현 시간 내림차순으로 정렬할 수 있다.', () => {
    const result = [fishA, fishB].sort(sortFishes({ orderBy: 'hours_DESC' }));

    expect(result[0]).toBe(fishB);
    expect(result[1]).toBe(fishA);
  });
});

describe('shadow', () => {
  beforeEach(() => {
    fishA.shadow = 'narrow';
    fishB.shadow = 3;
  });

  test('그림자 오름차순으로 정렬할 수 있다.', () => {
    const result = [fishA, fishB].sort(sortFishes({ orderBy: 'shadow_ASC' }));

    expect(result[0]).toBe(fishA);
    expect(result[1]).toBe(fishB);
  });

  test('그림자 내림차순으로 정렬할 수 있다.', () => {
    const result = [fishA, fishB].sort(sortFishes({ orderBy: 'shadow_DESC' }));

    expect(result[0]).toBe(fishB);
    expect(result[1]).toBe(fishA);
  });
});
