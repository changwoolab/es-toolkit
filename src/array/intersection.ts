import { FastSet } from '../utils/FastSet';

/**
 * Returns the intersection of two arrays.
 *
 * This function takes two arrays and returns a new array containing the elements that are
 * present in both arrays. It effectively filters out any elements from the first array that
 * are not found in the second array.
 *
 * @param {T[]} firstArr - The first array to compare.
 * @param {T[]} secondArr - The second array to compare.
 * @returns {T[]} A new array containing the elements that are present in both arrays.
 *
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [3, 4, 5, 6, 7];
 * const result = intersection(array1, array2);
 * // result will be [3, 4, 5] since these elements are in both arrays.
 */
export function intersection<T>(firstArr: readonly T[], secondArr: readonly T[]): T[] {
  const [largerArr, smallerArr] = distinguishLargerSmallerArray(firstArr, secondArr);

  if (smallerArr.length <= 50 && largerArr.length <= 10000) {
    // If the smaller array is small enough, using `Array.prototype.includes` is faster than using `Set`.
    return smallerArr.filter(item => {
      return largerArr.includes(item);
    });
  }

  const secondSet = new FastSet(secondArr);

  return firstArr.filter(item => {
    return secondSet.has(item);
  });
}

function distinguishLargerSmallerArray<T>(
  firstArr: readonly T[],
  secondArr: readonly T[]
): [readonly T[], readonly T[]] {
  return firstArr.length > secondArr.length ? [firstArr, secondArr] : [secondArr, firstArr];
}
