export const getRandomArrayPosition = (
  length: number,
  target: number,
): number => {
  return getRandomDifferentFromTarget(target, length, target);
};

const getRandomDifferentFromTarget = (
  position: number,
  length: number,
  target: number,
): number => {
  if (position !== target) {
    return position;
  }

  const randomPosition = Math.floor(Math.random() * length);
  return getRandomDifferentFromTarget(randomPosition, length, target);
};
