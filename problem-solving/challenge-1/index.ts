const calculatePositives = (
  number: number,
  smallestFraction: number,
  acc: { positives: number }
) => {
  const positives = acc.positives ?? 0;
  return number > 0 ? positives + smallestFraction : positives;
};

const calculateNegatives = (
  number: number,
  smallestFraction: number,
  acc: { negative: number }
) => {
  const negative = acc.negative ?? 0;
  return number < 0 ? negative + smallestFraction : negative;
};

const calculateZeros = (
  number: number,
  smallestFraction: number,
  acc: { zeros: number }
) => {
  const zeros = acc.zeros ?? 0;
  return number === 0 ? zeros + smallestFraction : zeros;
};

export const numbersFractionCalculator = (numbers: number[]) => {
  const smallestFraction = 1 / numbers.length;
  const results = numbers.reduce((acc, number) => {
    return {
      positives: calculatePositives(number, smallestFraction, acc),
      negative: calculateNegatives(number, smallestFraction, acc),
      zeros: calculateZeros(number, smallestFraction, acc),
    };
  }, {} as { positives: number; negative: number; zeros: number });

  return {
    positives: results.positives.toFixed(6),
    negative: results.negative.toFixed(6),
    zeros: results.zeros.toFixed(6),
  };
};
