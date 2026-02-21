module FSLabs.Calc

open System

type BinaryOperator =
    | Add
    | Subtract
    | Multiply
    | Divide
    | Power

type UnaryOperator =
    | Sqrt
    | Sin
    | Cos
    | Tan

type MathExpr =
    | Binary of float * BinaryOperator * float
    | Unary of UnaryOperator * float

let private handleBinaryOperation (Binary(a, op, b)) =
    match op with
    | Add -> a + b
    | Subtract -> a - b
    | Multiply -> a * b
    | Divide -> a / b
    | Power -> a ** b

let private handleUnaryOperation (Unary(op, a)) =
    match op with
    | Sqrt -> Math.Sqrt a
    | Sin -> Math.Sin a
    | Cos -> Math.Cos a
    | Tan -> Math.Tan a

let calcMathExpr expr =
    match expr with
    | Binary(a, op, b) -> handleBinaryOperation (Binary(a, op, b))
    | Unary(op, a) -> handleUnaryOperation (Unary(op, a))
