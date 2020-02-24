import deepEqual from './deep-equal';

const isObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]';

/**
 * Does a deep search on two objects and returns the differences
 *
 * @param oldData
 * @param newData
 * @param deletedValue
 */
function deepDiff<T>(oldData: any, newData: any, deletedValue: any = null): Partial<T> {
  if (!newData || !isObject(newData)) {
    return newData;
  }

  const diffs: { [key: string]: any } = {};

  const compare = (item1: any, item2: any, key: string) => {
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

  Object.keys(newData).forEach((key) => {
    compare(oldData[key], newData[key], key);
  });

  Object.keys(oldData).forEach((key) => {
    if (!newData[key]) {
      diffs[key] = deletedValue;
    }
  });

  return diffs as Partial<T>;
}

export default deepDiff;
