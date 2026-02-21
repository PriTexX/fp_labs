module FSLabs.Core

open System
open FSLabs.Calc
open FSharp.Core
open FSharpPlus

let binaryOperatorsMap =
    Map.ofSeq [ "+", Add; "-", Subtract; "*", Multiply; "/", Divide; "^", Power ]

let unaryOperatorsMap =
    Map.ofSeq [ "sqrt", Sqrt; "sin", Sin; "cos", Cos; "tan", Tan ]

let parseFloatSafe (input: string) =
    match Double.TryParse input with
    | true, value -> Some value
    | _ -> None

let (|MathExpr|_|) (input: string) =
    let parts = input.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries)

    match parts with
    | [| a; op; b |] ->
        monad {
            let! operator = Map.tryFind op binaryOperatorsMap
            let! aVal = parseFloatSafe a
            let! bVal = parseFloatSafe b

            return Binary(aVal, operator, bVal)
        }
    | [| op; a |] ->
        monad {
            let! operator = Map.tryFind op unaryOperatorsMap
            let! aVal = parseFloatSafe a

            return Unary(operator, aVal)
        }
    | _ -> None

let handleUserInput (input: string) =
    match input with
    | MathExpr expr -> Ok (calcMathExpr expr)
    | s -> Error $"Нераспознанное выражение - {s}"

let rec run () =
    printfn "Введите выражение: "
    
    let input = Console.ReadLine()
    
    let result =
        match input with
        | "exit" -> exit(0)
        | expr -> handleUserInput expr
    
    match result with
    | Ok value -> printfn $"Результат: {value}"
    | Error err -> printfn $"Ошибка: {err}"
    
    run ()
    

let showMenu () =
    printfn "============= КАЛЬКУЛЯТОР ============"
    printfn "Операции:"
    printfn "  + - * / ^          — арифметика (2 числа)"
    printfn "  sin cos tan        — тригонометрия (1 число, градусы)"
    printfn "  sqrt               — квадратный корень (1 число)"
    printfn "  exit               — выход"
    printfn "======================================"
    printf "-> "

showMenu ()

run ()
