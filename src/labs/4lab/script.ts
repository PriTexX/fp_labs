type BinaryOp = (a: number, b: number) => number;
type UnaryOp = (x: number) => number;

const add: BinaryOp = (a, b) => a + b;
const subtract: BinaryOp = (a, b) => a - b;
const multiply: BinaryOp = (a, b) => a * b;
const divide: BinaryOp = (a, b) => a / b;
const power: BinaryOp = (a, b) => Math.pow(a, b);
const sqrt: UnaryOp = (x) => Math.sqrt(Math.abs(x));

const operations = {
  add,
  subtract,
  multiply,
  divide,
  power,
  sqrt,
};

type Operation = keyof typeof operations;

type State = {
  num1: number;
  num2: number;
  op: Operation | null;
  result: number | null;
};

const opSymbol = {
  add: "+",
  subtract: "-",
  multiply: "×",
  divide: "÷",
  power: "^",
  sqrt: "√",
};

const calculateResult = (state: State): number | null => {
  if (!state.op) {
    return null;
  }

  if (state.op == "sqrt") {
    return operations.sqrt(state.num1);
  }

  return operations[state.op](state.num1, state.num2);
};

const updateState = (state: State, updates: Partial<State>): State => ({
  ...state,
  ...updates,
  result: calculateResult({ ...state, ...updates }),
});

const render = (state: State): void => {
  const num1Input = document.getElementById("num1") as HTMLInputElement;
  const num2Input = document.getElementById("num2") as HTMLInputElement;

  num1Input.value = state.num1.toString();
  num2Input.value = state.num2.toString();

  const opDisplay = document.getElementById("operation")!;
  opDisplay.textContent = state.op ? opSymbol[state.op] : "?";

  const resultEl = document.getElementById("result")!;
  resultEl.textContent =
    state.result !== null && !isNaN(state.result)
      ? `Результат: ${state.result.toLocaleString()}`
      : "Результат: -";
};

const onNumChange =
  (numElementId: string, numKey: "num1" | "num2") => (state: State) => {
    const val =
      parseFloat(
        (document.getElementById(numElementId) as HTMLInputElement).value,
      ) ?? 0;

    return updateState(state, { [numKey]: val });
  };

const onNum1Change = onNumChange("num1", "num1");
const onNum2Change = onNumChange("num2", "num2");

const setOperation = (op: Operation) => {
  currentState = updateState(currentState, { op });

  render(currentState);
};

const forceRecalculate = (state: State): State => updateState(state, {});

let currentState: State = { num1: 0, num2: 0, op: null, result: null };

document.addEventListener("DOMContentLoaded", () => {
  const num1Input = document.getElementById("num1") as HTMLInputElement;
  const num2Input = document.getElementById("num2") as HTMLInputElement;
  const calcBtn = document.getElementById("calculateBtn")!;

  num1Input.addEventListener("input", () => {
    currentState = onNum1Change(currentState);

    render(currentState);
  });

  num2Input.addEventListener("input", () => {
    currentState = onNum2Change(currentState);

    render(currentState);
  });

  calcBtn.addEventListener("click", () => {
    currentState = forceRecalculate(currentState);
    render(currentState);
  });

  render(currentState);
});
