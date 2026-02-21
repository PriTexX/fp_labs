// Разработайте набор чистых функций для выполнения общих математических операций

let add a b = a + b

let subtract a b = a - b

let multiply a b = a * b

let divide a b = a / b

// Напишите рекурсивную функцию для вычисления факториала числа.
let rec fact n =
    match n with
    | n when n < 0 -> invalidArg "n" "Cant be negative"
    | 0 | 1 -> 1
    | n -> n * fact (n - 1)
 