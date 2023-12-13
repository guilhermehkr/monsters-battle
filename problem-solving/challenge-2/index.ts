const dice = [1, 2, 3, 4, 5, 6];
export const diceFacesCalculator = (
  dice1: number,
  dice2: number,
  dice3: number
): number => {
  const isOutOfRange =
    [dice1, dice2, dice3].find((value) => !dice.includes(value)) != null;

  if (isOutOfRange) {
    throw Error("Dice out of number range");
  }

  const diceMap = [dice1, dice2, dice3].reduce((acc, dice) => {
    return {
      ...acc,
      [dice]: (acc[dice] ?? 0) + dice,
    };
  }, {} as { [value: number]: number });

  const [result] = Object.entries(diceMap)
    .filter(([key, value]) => key !== value.toString())
    .map(([, value]) => value);

  return result ?? Math.max(dice1, dice2, dice3);
};
