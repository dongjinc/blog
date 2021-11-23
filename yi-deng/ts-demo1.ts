/** ts 元组与数组 */
// 已有数组
let arr: number[] = [1];
let arr2: Array<number> = [2];

interface NumberArray {
  [index: number]: number;
}

let arr3: NumberArray = [1, 2, 3];

// 类数组
function sum() {
  let args: IArguments = arguments;
  // args.callee()
}

// 元组
let tuple: [number, string] = [1, "测试"];

// 元组与数组区别
function useFetch() {
  const response: string = "京城一灯";
  const age = 30;
  return [response, age];
}
// 在使用react hook返回元组时，出现类型不一致的情况，会导致 response 类型推断为 type1 | type2
// 解决方式一：
function useFetch1() {
  const response: string = "京城一灯";
  const age = 30;
  return [response, age] as const;
}
// ts中 as const 是什么意思？
// 解决方式二：
function tuplify<T extends Array<any>>(...elements: T): T {
  return elements;
}
function useFetch2() {
  const response: string = "京城一灯";
  const age = 30;
  return tuplify(response, age);
}

// tuplify 类推出
// function tuplify<[string, number]>(elements_0: string, elements_1: number): [string, number]

const [response] = useFetch2();

/** ts函数 */

// 1.不要混淆ES6和TS中 "=>" lanmuda 表达式
let myNum: (x: number, y: number) => number = function (x, y) {
  return x + y;
};
// 其中 : (x: number, y: number) => number ts函数定义

// 2.函数默认参数
function buildName(firstName: string, lastName: string = "Car") {
  return firstName + lastName;
}

// 3.剩余参数
function push_back(array: any[], ...items: any[]) {
  items.forEach((item) => {
    array.push(item);
  });
}
let a = [4];
push_back(a, 2, 3, 4, 5);

// 4.可选参数 必须要放到后面
function buildNames(lastName: string, firstName?: string) {}

/**
 * ts中的类
 * 1.抽象类 可具体实现，也可以定义抽象方法。抽象方法必须由继承类自己实现
 * 2.方法修饰符
 *  public  公有的 任何地方都可以访问到
 *  private 私有的 不能在类的外部使用(包括子类)
 *  protect 保护的 不能在类的外部使用，但可在子类使用
 */
// 抽象类与接口存在区别
// abstract 与 interface
abstract class Animal {
  abstract makeSound(): void;
  protected move() {
    console.log(1);
  }
}

// Tabnine - Code Faster with the All-Language AI Assistant for Code Completion, autocomplete JavaScript, Python, TypeScript, PHP, Go, Java, node.js, Ruby, C/C++, HTML/CSS, C#, Rust, SQL, Bash, Kotlin, R
// 1.类即可是 实体类 也可是 类型
class Dog extends Animal {
  makeSound() {}
}

const dog = new Dog();

const s2: Animal[] = [dog];

// #私有符 与 private 区别
class Demo {
  private num: number;
  constructor() {
    this.num = 20;
  }
}
const s = new Demo();
// console.log(s.num)

class Demo1 {
  #num: number;
  constructor() {
    this.#num = 20;
  }
}
const s1 = new Demo();
// console.log(s1.num)
// # 私有修饰符 用了 weakMap

/**
 * 类型断言
 */
// 类型断言
function getLength1(str: string | number): number {
  if ((<string>str).length) {
    return (<string>str).length; // (str as string).length
  } else {
    return str.toString().length;
  }
}

function getLength2(str: string | number): number {
  if (typeof str === "string") {
    return str.length;
  } else {
    return str.toString().length;
  }
}

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver) {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
/**
 * ts泛型
 */
interface LengthWise {
  length: number;
}
function identify<T extends LengthWise>(arg: T): T {
  return arg;
}
identify("京城一灯");

// 既能当类型、也能当实体类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

const myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 2;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// 函数的重载
function add(...rest: number[]): number;
function add(...rest: string[]): string;
function add(...rest: any[]) {
  let first = rest[0];
  if (typeof first === "number") {
    return rest.reduce((pre, cur) => pre + cur);
  }
  if (typeof first === "string") {
    return rest.join("");
  }
}

console.log(add(1, 2));
console.log(add("a", "v"));

// 使用泛型实现重载
function getData<T>(value: T): T {
  return value;
}

getData<number>(1);

// 泛型接口
interface ConfigFn {
  <T>(value: T): void;
}
const getData2: ConfigFn = function <T>(value: T): void {
  console.log(value);
};

getData2("2");

// 动态泛型
interface Bookmark {
  msg: string;
}
interface Bookmark1 {
  msg: string;
}

class BookmarkService<T extends Bookmark = Bookmark1> {
  items: T[] = [];
}
const s3 = new BookmarkService();

s3.items = [{ msg: "1" }];
