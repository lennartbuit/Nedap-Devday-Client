import {range} from "./utils";
import {RULES} from "./constants";

export const runDetector = (detector, shifts, traces) => {
  const ruleRange = range(1, RULES + 1);

  const results = {};
  traces.forEach(trace => {
    const {id} = trace;
    // Don't judge my JavaScript, it's flawless
    //
    // Call the next rule until a rule returned true if it did, record the rule number.
    results[id] = ruleRange.reduce(
      (result, index) => result || (detector[`violatesRule${index}`](shifts, trace) && index),
      false
    ) || 0;
  });
  return results;
}
