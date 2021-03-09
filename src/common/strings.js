export const join = (values, separator = ', ') => {
  if (!values) {
    return '';
  }
  if (!Array.isArray(values)) {
    return `${values}`;
  }
  if (values.length > 0) {
    return values
      .filter((word) => word.length > 0)
      .reduce((word0, word1) => `${word0}${separator}${word1}`)
  }
  return ''
};

const all = { join }

export default all
