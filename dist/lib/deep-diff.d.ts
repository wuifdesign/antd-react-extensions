/**
 * Does a deep search on two objects and returns the differences
 *
 * @param oldData
 * @param newData
 * @param deletedValue
 */
declare function deepDiff<T>(oldData: any, newData: any, deletedValue?: any): Partial<T>;
export default deepDiff;
