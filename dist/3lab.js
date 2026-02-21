var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Функция, которая принимает массив чисел и возвращает новый массив, содержащий только числа, кратные заданному числу.
var multiples = function (numbers, divisor) {
    return numbers.filter(function (n) { return n % divisor === 0; });
};
// Функция, которая принимает массив строк и возвращает новую строку, содержащую все строки, объединенные заданным разделителем.
var join = function (strings, separator) { return strings.join(separator); };
// Функция, которая принимает массив объектов и возвращает новый массив, отсортированный по значению определенного свойства.
var sortByProperty = function (objects, prop, sortOrder) {
    return __spreadArray([], objects, true).sort(function (a, b) {
        var valA = a[prop];
        var valB = b[prop];
        if (sortOrder == "asc") {
            return valA > valB ? 1 : valA < valB ? -1 : 0;
        }
        return valA < valB ? 1 : valA > valB ? -1 : 0;
    });
};
// Создайте функцию, которая принимает другую функцию в качестве аргумента и возвращает новую функцию, которая выполняет логирование перед вызовом исходной функции.
var withLogging = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var timestamp = new Date().toISOString();
        console.log("[".concat(timestamp, "] \u0412\u044B\u0437\u043E\u0432 ").concat(fn.name || "anonymous", ":"), args);
        var result = fn.apply(void 0, args);
        console.log("[".concat(timestamp, "] \u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 ").concat(fn.name || "anonymous", ":"), result);
        return result;
    };
};
var test = function (f) { return "".concat(f, " fff"); };
var loggedTest = withLogging(test);
loggedTest(12);
