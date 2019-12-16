import { range } from "./utils";
import { RULES } from "./constants";

export const makeOracle = results =>
  range(1, RULES + 1).reduce(
    (memo, rule) => ({
      ...memo,
      [`violatesRule${rule}`]: (_shifts, { id }) => results[id] === rule
    }),
    {}
  );
