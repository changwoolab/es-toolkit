import { bench, describe } from 'vitest';
import { intersection as intersectionToolkit } from 'es-toolkit';
import { intersection as intersectionLodash } from 'lodash';

describe('intersection, small arrays', () => {
  const array1 = [1, 2, 3];
  const array2 = [2, 4];

  bench('es-toolkit', () => {
    intersectionToolkit(array1, array2);
  });

  bench('lodash', () => {
    intersectionLodash(array1, array2);
  });
});

describe('intersection, large array with small numbers', () => {
  const array1 = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));
  const array2 = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000));

  bench('es-toolkit', () => {
    intersectionToolkit(array1, array2);
  });

  bench('lodash', () => {
    intersectionLodash(array1, array2);
  });
});

describe('intersection, large array with large numbers', () => {
  const array1 = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000000000 + 100000));
  const array2 = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 1000000000 + 100000));

  bench('es-toolkit', () => {
    intersectionToolkit(array1, array2);
  });

  bench('lodash', () => {
    intersectionLodash(array1, array2);
  });
});

describe('intersection, large arrays with short strings', () => {
  const array1 = Array.from({ length: 10000 }, () => getLongRandomString(10));
  const array2 = Array.from({ length: 10000 }, () => getLongRandomString(10));

  bench('es-toolkit', () => {
    intersectionToolkit(array1, array2);
  });

  bench('lodash', () => {
    intersectionLodash(array1, array2);
  });
});

describe('intersection, large arrays with long strings', () => {
  const array1 = Array.from({ length: 10000 }, () => getLongRandomString(1000));
  const array2 = Array.from({ length: 10000 }, () => getLongRandomString(1000));

  bench('es-toolkit', () => {
    intersectionToolkit(array1, array2);
  });

  bench('lodash', () => {
    intersectionLodash(array1, array2);
  });
});

function getLongRandomString(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 1000).toString()).join('');
}
