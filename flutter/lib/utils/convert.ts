export const nearestValue = (goal: number, array: Array<number>): number => {
    return array.reduce(function (prev, curr) {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });
  };
  