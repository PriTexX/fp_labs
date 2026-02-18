// -------------------------  Разработайте набор чистых функций для работы с массивами  -------------------------
const even = (numbers) => numbers.filter((n) => n % 2 == 0);

const square = (numbers) => numbers.map((n) => n ** 2);

const filterByProp = (objs, prop, val) =>
  objs.filter((obj) => obj[prop] === val);

const sum = (numbers) => numbers.reduce((acc, n) => acc + n, 0);

// -------------------------  Создайте функцию высшего порядка, которая принимает функцию и массив  -------------------------
// -------------------------  в качестве аргументов и применяет функцию к каждому элементу массива, -------------------------
// -------------------------  возвращая новый массив с результатами                                 -------------------------

const map = (fn, arr) => arr.map(fn);

// -------------------------  Используя разработанные функции, выполните математические операции  -------------------------

// Найдите сумму квадратов всех чётных чисел в заданном массиве
const sumOfSquaresOfEvensInArray = (numbers) => sum(square(even(numbers)));

console.log(sumOfSquaresOfEvensInArray([1, 2, 3, 4, 5])); // 20

const gt = (val) => (numbers) => numbers.filter((n) => n > val);

const count = (numbers) => numbers.length;

const mean = (numbers) => sum(numbers) / count(numbers);

// Найдите среднее арифметическое всех чисел, больших заданного значения, в заданном массиве объектов
const meanGtThan = (val) => (numbers) => mean(gt(val)(numbers));

console.log(meanGtThan(5)([2, 4, 5, 6, 8])); // 7
