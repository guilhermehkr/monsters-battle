import { getRandomArrayPosition } from '..';

describe('getRandomArrayPosition()', () => {
  it.each([
    { length: 4, target: 1 },
    { length: 5, target: 4 },
  ])(
    'should return a random position other than the target',
    ({ length, target }) => {
      const randomPosition = getRandomArrayPosition(length, target);
      expect(randomPosition).not.toBe(target);
    },
  );
});
