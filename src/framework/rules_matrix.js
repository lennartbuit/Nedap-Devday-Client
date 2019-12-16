import {ALL_RULES} from "./constants";
import {informedness, sensitivity, specificity} from "./binary_matrix";

const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));

const mergeResults = (actual, predicted) => {
  const result = {};
  Object.entries(actual).forEach(([key, value]) => {
    result[key] = {actual: value};
  });
  Object.entries(predicted).forEach(([key, value]) => {
    result[key].predicted = value;
  });
  return result;
};

const all = rulesMatrix =>
  new Set(rulesMatrix.flatMap(x => x.flatMap(x => [...x])));

const actual = (rulesMatrix, rule) =>
  rulesMatrix.map(predicted => predicted[rule]);

const predicted = (rulesMatrix, rule) => rulesMatrix[rule];

const fp = (rulesMatrix, rule) => {
  const preds = [...predicted(rulesMatrix, rule)];
  preds.splice(rule, 1);
  return new Set(preds.flatMap(x => [...x]));
};

const fn = (rulesMatrix, rule) => {
  const actuals = [...actual(rulesMatrix, rule)];
  actuals.splice(rule, 1);
  return new Set(actuals.flatMap(x => [...x]));
};

const tp = (rulesMatrix, rule) => new Set(rulesMatrix[rule][rule]);

export const rulesMatrix = (actual, predicted) => {
  let result = [...ALL_RULES].map(() => [...ALL_RULES].map(() => new Set()));

  const merged = mergeResults(actual, predicted);
  Object.entries(merged).forEach(([id, {predicted, actual}]) => {
    result[predicted][actual].add(id);
  });

  return result;
};

export const binaryMatrix = (rulesMatrix, rule) => {
  const fps = fp(rulesMatrix, rule);
  const fns = fn(rulesMatrix, rule);
  const tps = tp(rulesMatrix, rule);
  const tns = [fps, fns, tps].reduce(
    (memo, set) => difference(memo, set),
    all(rulesMatrix)
  );

  return {
    fp: fps,
    fn: fns,
    tp: tps,
    tn: tns
  };
};

const weighted = metric => rulesMatrix => {
  const samples = all(rulesMatrix);

  return (
    [...ALL_RULES]
      .map(rule => binaryMatrix(rulesMatrix, rule))
      .reduce((result, binaryMatrix) => {
        const {tp, fn} = binaryMatrix;

        return result + metric(binaryMatrix) * (tp.size + fn.size);
      }, 0) / samples.size
  );
};

export const weightedSensitivity = weighted(sensitivity);
export const weightedSpecificy = weighted(specificity);
export const weightedInformedness = weighted(informedness);
