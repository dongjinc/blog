/**
 * A new syntax for ReadonlyArray
 */
// 1. can’t add, remove, or replace any elements of the array
function foo(arr: ReadonlyArray<string>) {
  arr.slice(); // okay
  arr.push("hello!"); // error!
}
// While it’s good practice to use ReadonlyArray over Array when no mutation is intended, it’s often been a pain given that arrays have a nicer syntax. Specifically, number[] is a shorthand version of Array<number>, just as Date[] is a shorthand for Array<Date>.

// TypeScript 3.4 introduces a new syntax for ReadonlyArray using a new readonly modifier for array types.
function foo1(arr: readonly string[]) {
  arr.slice(); // okay
  arr.push("hello!"); // error!
}

// 2.readonly tuples
function foo2(pair: readonly [string, number]) {
  console.log(pair[0]); // okay
  pair[1] = "hello!";
}

// 3.readonly mapped type modifiers and readonly arrays

// How code acted *before* TypeScript 3.4
// { readonly a: string, readonly b: number }
type A = Readonly<{ a: string; b: number }>;
// number[]
type B = Readonly<number[]>;
// [string, boolean]
type C = Readonly<[string, boolean]>;

// How code acts now *with* TypeScript 3.4
// { readonly a: string, readonly b: number }
type A_back = Readonly<{ a: string; b: number }>;
// readonly number[]
type B_back = Readonly<number[]>;
// readonly [string, boolean]
type C_back = Readonly<[string, boolean]>;

type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

type Writable1<T> = {
  -readonly [K in keyof T]: T[K];
};

// { a: string, b: number }
type A1_back = Writable<{
  readonly a: string;
  readonly b: number;
}>;

function compose<A, B, C>(f: (arg: A) => B, g: (arg: B) => C): (arg: A) => C {
  return (x) => g(f(x));
}
