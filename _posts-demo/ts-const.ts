// readonly
// let err1: readonly Set<number>
let ok1: readonly boolean[];
let ok2: readonly [string, number];

ok1 = [false];
ok1 = [false];

/**
 * 记录问题
 * 1.ts 中 as const 是什么意思
 * 2.#私有修饰符和private的区别
 * 3.type和interface区别
 */
// 1.没有类型扩展的字面类型
const love = 123 as const;

const x = "x"; // x has the type 'x'

// let y = "y" // has the type string

// y 被扩展为更通用的类型(string)，并允许将其重新分配给该类型的其他值，而变量 x 只能具有 'x'的值。

// 如果要把y通用类型改成限定类型，可以通过
let y = "y" as const;

// 2.对象字面量获取只读属性
const setCount = (n: number) => {
  return {
    type: "SET_COUNT",
    payload: n,
  };
};

const action = setCount(3);
// 即使我们将 action 声明为 const，仍然可以重新分配 type 属性，因此，该属性被扩展成了字符串类型。
// 其中setCount被定义为 {type: string, payload: number}

// 如果在redux中 type 类型要保持唯一，需要限定对象字面量

const setCount1 = (n: number) => {
  // return {
  //   type: 'SET_COUNT',
  //   payload: n
  // } as const;
  return <const>{
    type: "SET_COUNT",
    payload: n,
  };
};

const action1 = setCount1(3);
// 其中setCount被定义为 { readonly type: "SET_COUNT"; readonly payload: number;}

interface SetCount {
  type: "SET_COUNT";
  payload: number;
}

interface ResetCount {
  type: "RESET_COUNT";
}

const setCount2 = (n: number): SetCount => {
  return {
    type: "SET_COUNT",
    payload: n,
  };
};

const resetCount = (): ResetCount => {
  return {
    type: "RESET_COUNT",
  };
};

type CountActions = SetCount | ResetCount;

// 我们创建了两个接口 RESET_COUNT 和 SET_COUNT 来对两个 resetCount 和 setCount 的返回类型进行归类。

// 使用 const assertions，我们可以通过使用 const、 ReturnType 和 typeof 的组合来消除声明这些接口的需要：

const setCount3 = (n: number) => {
  return <const>{
    type: "SET_COUNT",
    payload: n,
  };
};

const resetCount3 = () => {
  return <const>{
    type: "RESET_COUNT",
  };
};

type CountActions1 =
  | ReturnType<typeof setCount3>
  | ReturnType<typeof resetCount3>;

// 3.数组字面量成为只读元组
/**
 * 在 TypeScript 3.4 之前，声明一个字面量数组将被扩展并且可以修改。使用 const，我们可以将字面量锁定为其显式值，也不允许修改。
 */
const action4 = {
  type: "SET_HOURS",
  payload: [8, 12, 5, 8],
};
//  { type: string; payload: number[]; }

action4.payload.push(12); // no error

const action5 = <const>{
  type: "SET_HOURS",
  payload: [8, 12, 5, 8],
};
// {
//  readonly type: "SET_HOURS";
//  readonly payload: readonly [8, 12, 5, 8];
// }
// action5.payload.push(12); // Property 'push' does not exist on type 'readonly [8, 12, 5, 8]'

let answer = 42;
// error! Property 'answer' does not exist on 'typeof globalThis'.
globalThis.answer = 333333;

// in a global file:
var abc = 100;
// Refers to 'abc' from above.
globalThis.abc = 200;

// Error! A 'const' assertion can only be applied to a
// to a string, number, boolean, array, or object literal.
// 因为 三元运算符 不再 as const 范围内
// let a1 = (Math.random() < 0.5 ? 0 : 1) as const;
// let b = (60 * 60 * 1000) as const;
// works!
let a1_back = Math.random() < 0.5 ? (0 as const) : (1 as const);
let b_back = 3_600_000 as const;

// typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
