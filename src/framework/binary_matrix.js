export const sensitivity = ({ tp, fn }) => (tp.size / (tp.size + fn.size)) || 0.0;
export const specificity = ({ tn, fp }) => (tn.size / (tn.size + fp.size)) || 0.0;
export const informedness = binaryMatrix =>
  sensitivity(binaryMatrix) + specificity(binaryMatrix) - 1;
