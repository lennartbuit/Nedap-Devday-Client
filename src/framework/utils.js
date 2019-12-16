export const range = (start, end) =>
  [...Array(end - start).keys()].map(i => i + start);

