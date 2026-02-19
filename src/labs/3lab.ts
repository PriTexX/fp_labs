// Функция, которая принимает массив чисел и возвращает новый массив, содержащий только числа, кратные заданному числу.
const multiples = (numbers: number[], divisor: number): number[] =>
  numbers.filter((n) => n % divisor === 0);

// Функция, которая принимает массив строк и возвращает новую строку, содержащую все строки, объединенные заданным разделителем.
const join = (strings: string[], separator: string) => strings.join(separator);

// Функция, которая принимает массив объектов и возвращает новый массив, отсортированный по значению определенного свойства.
const sortByProperty = <T extends Record<string, unknown>, K extends keyof T>(
  objects: T[],
  prop: K,
  sortOrder: "asc" | "desc",
): T[] =>
  [...objects].sort((a, b) => {
    const valA = a[prop];
    const valB = b[prop];

    if (sortOrder == "asc") {
      return valA > valB ? 1 : valA < valB ? -1 : 0;
    }

    return valA < valB ? 1 : valA > valB ? -1 : 0;
  });

// Создайте функцию, которая принимает другую функцию в качестве аргумента и возвращает новую функцию, которая выполняет логирование перед вызовом исходной функции.
const withLogging = <F extends (...args: any[]) => any>(
  fn: F,
): ((...args: Parameters<F>) => ReturnType<F>) => {
  return (...args: Parameters<F>) => {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] Вызов ${fn.name || "anonymous"}:`, args);

    const result = fn(...args);

    console.log(`[${timestamp}] Результат ${fn.name || "anonymous"}:`, result);

    return result;
  };
};

const test = (f: number) => `${f} fff`;

const loggedTest = withLogging(test);

loggedTest(12);
