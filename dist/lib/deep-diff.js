import deepEqual from './deep-equal';

const isObject = obj => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * Does a deep search on two objects and returns the differences
 *
 * @param oldData
 * @param newData
 * @param deletedValue
 */


function deepDiff(oldData, newData, deletedValue = null) {
  if (!newData || !isObject(newData)) {
    return newData;
  }

  const diffs = {};

  const compare = (item1, item2, key) => {
    if (!deepEqual(item1, item2)) {
      if (isObject(item2)) {
        const subDiff = deepDiff(item1, item2, deletedValue);

        if (Object.keys(subDiff).length) {
          diffs[key] = subDiff;
        }
      } else {
        diffs[key] = item2;
      }
    }
  };

  for (const key in newData) {
    if (Object.prototype.hasOwnProperty.call(newData, key)) {
      compare(oldData[key], newData[key], key);
    }
  }

  for (const key in oldData) {
    if (Object.prototype.hasOwnProperty.call(oldData, key)) {
      if (typeof newData[key] === 'undefined') {
        diffs[key] = deletedValue;
      }
    }
  }

  return diffs;
}

export default deepDiff;