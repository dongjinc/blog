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

// 泛型类、泛型接口、泛型重载、泛型默认值

// solid

/**
 * 9.typescript实现接口
 */
// interface和type区别
/**
 * 相同点
 * 1-1.都可以描述一个对象或者函数
 * 1-2.都允许进行扩展
 * 不同点
 * 2-1.type声明基本类型别名、联合类型、元组等
 * 2-2.typeof获取实例的对象
 * 2-3.interface可以被合并
 */
// nodejs BFF架构
interface IPriceData {
  id: number;
}

function getPriceData() {
  return new Promise<IPriceData[]>((resolve, reject) => {
    resolve([{ id: 1 }]);
  });
}

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}

class AnalogClock implements ClockInterface {
  public tick() {
    console.log("ding ding");
  }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number) {
  return new ctor(hour, minute);
}
const digital = createClock(AnalogClock, 1, 2);

/**
 * 10.typescript 装饰器
 * tsconfig.json 开启
 */
// import 'reflect-metadata'
function inject(serviceIdentifier: string) {
  return function (target: Object, targetKey: string, index: number) {
    // Reflect.defineMetadata(serviceIdentifier, '666', target)
  };
}
class IndexController {
  public indexService: string;
  constructor(@inject("xxxx") indexService: string) {
    // 注入
    this.indexService = indexService;
  }
}

const indexController = new IndexController("京程🥇");
console.log("🍅", indexController.indexService);
console.log("🍊", Reflect.getMetadata("xxx", IndexController));

// 什么是IOC注入
// 什么是元编程

/**
 * 11.typescript常见操作符号
 * ! 非空断言操作符
 * ?. 可选链
 * ?? 空值合并运算符
 * ?: 可选属性
 * &  多种类型叠加
 * |  多种类型中的一种
 * _  数字分隔符 如1_23_43
 * <> typescript泛型
 * @  装饰器
 * #  类的私有字段
 * -? 移除了可选属性中的'?'
 */

/**
 * 12.typescript高级类型与实用程序
 * ConstructorParameters - 类构造函数的参数类型的元组
 * Exclude - 从另一个类型中排出了一个类型
 * extract - 选择给可分配给另一种类型的子类型
 * instanceType - 获取构造函数的实例类型
 * NonNullable - 从类型中排出null和undefined
 * Parameters - 函数参数类型的元组
 * Partial - 将对象中的所有属性设为可选
 * Readonly - 使对象中的所有属性为只读
 * ReadonlyArray - 制作给定类型的不可变数组
 * Pick - 从一个复合类型中，取出几个想要的类型组合
 * Record - 从键类型到值类型的映射
 * Required - 将对象中的所有属性设为必需
 * ReturnType - 获取函数类型的返回类型
 */

/** 13.tsdoc */

/**
 * 14.typescript有关dom提示
 */
const textEl = document.querySelector<HTMLInputElement>("input");
if (textEl !== null) {
  textEl.addEventListener("click", (e) => {
    // console.log(e.target);
    textEl.value;
  });
}

/**
 * 15.使用webpack搭建ts环境
 * swc-loader rust语言作支撑，更接近于机器码，编译会更快
 * 与传统的babel-loader有什么区别呢？
 * eslint-config-airbnb-typescript
 */

/**
 * 16.使用Parameters获取函数参数
 */

const yd = (yideng: string, user: number) => {};
type yideng = Parameters<typeof yd>;
const x = (...data: yideng) => {
  const [yideng] = data;
  console.log("yideng", yideng);
};

x("测试", 20);

/**
 * 17.Typescript高级类型
 */

interface IUser {
  id: number;
  age: number;
  name: string;
}
// - 变成可选
type PartialUser = Partial<IUser>;
// - 必选
// Required<>
// - 选择一部分字段
// Pick<>
// - 排除一部分字段
// Omit<>
// - 从一个类型 选择 另外一种类型 排除两个类型的交集
// Exclude<'x' | 'a', 'x' | 'y' | 'z'>

type Select = "id" | "age";
type PartialSelect = Partial<Pick<IUser, Select>>;

// - 提取相同的
// Extract

type ReturnType1<T> = T extends (...args: any[]) => infer R ? Partial<R> : T;

type func = () => { name: string };
type variable = string;
type funcReturnType = ReturnType1<func>; // funcReturnType 类型为 number
type varReturnType = ReturnType1<variable>; // varReturnType 类型为 string

interface ILove1 {
  name: string;
  age?: string;
}
interface ILove2 {
  name: string;
  age: number;
}

type Str = string;
type Num = number;

interface IType {
  <T>(value: T extends ILove1 ? ILove1 : ILove2): void;
}

const FType: IType = function (value) {};
FType<ILove1>({ name: "1" });

// type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

type T1 = { name: string };
type T2 = { age: number };

type UnionToIntersection<T> = T extends T1 ? T1 : T2;
type T3<T> = UnionToIntersection<T>; // 


type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

interface Love {
  <T>(value: Unpacked<T>): void
}

const JK: Love = function(value){
  return value
}

JK()

interface Kl{
  name: string
}

declare namespace WechatMiniprogram {
  interface Share {
    getShareInfo<T extends Kl = Kl>(
      option: T
    ): any
  }
}

interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
 
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;


  function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw "unimplemented";
  }
   
  let a1 = createLabel("typescript");
   
  let a2 = createLabel(1)
  