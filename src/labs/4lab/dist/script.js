var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var add = function (a, b) { return a + b; };
var subtract = function (a, b) { return a - b; };
var multiply = function (a, b) { return a * b; };
var divide = function (a, b) { return a / b; };
var power = function (a, b) { return Math.pow(a, b); };
var sqrt = function (x) { return Math.sqrt(Math.abs(x)); };
var operations = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    power: power,
    sqrt: sqrt,
};
var getOpSymbol = function (op) {
    return ({
        add: "+",
        subtract: "-",
        multiply: "×",
        divide: "÷",
        power: "^",
        sqrt: "√",
    })[op];
};
var calculateResult = function (state) {
    if (!state.op) {
        return null;
    }
    if (state.op == "sqrt") {
        return operations.sqrt(state.num1);
    }
    return operations[state.op](state.num1, state.num2);
};
var updateState = function (state, updates) { return (__assign(__assign(__assign({}, state), updates), { result: calculateResult(__assign(__assign({}, state), updates)) })); };
var render = function (state) {
    var num1Input = document.getElementById("num1");
    var num2Input = document.getElementById("num2");
    num1Input.value = state.num1.toString();
    num2Input.value = state.num2.toString();
    var opDisplay = document.getElementById("operation");
    opDisplay.textContent = state.op ? getOpSymbol(state.op) : "?";
    var resultEl = document.getElementById("result");
    resultEl.textContent =
        state.result !== null && !isNaN(state.result)
            ? "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ".concat(state.result.toLocaleString())
            : "Результат: —";
};
var onNumChange = function (numElementId, numKey) { return function (state) {
    var _a;
    var _b;
    var val = (_b = parseFloat(document.getElementById(numElementId).value)) !== null && _b !== void 0 ? _b : 0;
    return updateState(state, (_a = {}, _a[numKey] = val, _a));
}; };
var onNum1Change = onNumChange("num1", "num1");
var onNum2Change = onNumChange("num2", "num2");
var setOperation = function (op) {
    currentState = updateState(currentState, { op: op });
    render(currentState);
};
var forceRecalculate = function (state) { return updateState(state, {}); };
var currentState = { num1: 0, num2: 0, op: null, result: null };
document.addEventListener("DOMContentLoaded", function () {
    var num1Input = document.getElementById("num1");
    var num2Input = document.getElementById("num2");
    var calcBtn = document.getElementById("calculateBtn");
    num1Input.addEventListener("input", function () {
        currentState = onNum1Change(currentState);
        render(currentState);
    });
    num2Input.addEventListener("input", function () {
        currentState = onNum2Change(currentState);
        render(currentState);
    });
    calcBtn.addEventListener("click", function () {
        currentState = forceRecalculate(currentState);
        render(currentState);
    });
    render(currentState);
});
