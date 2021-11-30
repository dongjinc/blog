/**
 * A new syntax for ReadonlyArray
 */
// 1. can’t add, remove, or replace any elements of the array
function foo(arr) {
    arr.slice(); // okay
    arr.push("hello!"); // error!
}
// While it’s good practice to use ReadonlyArray over Array when no mutation is intended, it’s often been a pain given that arrays have a nicer syntax. Specifically, number[] is a shorthand version of Array<number>, just as Date[] is a shorthand for Array<Date>.
// TypeScript 3.4 introduces a new syntax for ReadonlyArray using a new readonly modifier for array types.
function foo1(arr) {
    arr.slice(); // okay
    arr.push("hello!"); // error!
}
// 2.readonly tuples
function foo2(pair) {
    console.log(pair[0]); // okay
    pair[1] = "hello!";
}
function compose(f, g) {
    return function (x) { return g(f(x)); };
}
