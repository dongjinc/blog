var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _num;
/** ts 元组与数组 */
// 已有数组
var arr = [1];
var arr2 = [2];
var arr3 = [1, 2, 3];
// 类数组
function sum() {
    var args = arguments;
    // args.callee()
}
// 元组
var tuple = [1, "测试"];
// 元组与数组区别
function useFetch() {
    var response = "京城一灯";
    var age = 30;
    return [response, age];
}
// 在使用react hook返回元组时，出现类型不一致的情况，会导致 response 类型推断为 type1 | type2
// 解决方式一：
function useFetch1() {
    var response = "京城一灯";
    var age = 30;
    return [response, age];
}
// ts中 as const 是什么意思？
// 解决方式二：
function tuplify() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    return elements;
}
function useFetch2() {
    var response = "京城一灯";
    var age = 30;
    return tuplify(response, age);
}
// tuplify 类推出
// function tuplify<[string, number]>(elements_0: string, elements_1: number): [string, number]
var response = useFetch2()[0];
/** ts函数 */
// 1.不要混淆ES6和TS中 "=>" lanmuda 表达式
var myNum = function (x, y) {
    return x + y;
};
// 其中 : (x: number, y: number) => number ts函数定义
// 2.函数默认参数
function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = "Car"; }
    return firstName + lastName;
}
// 3.剩余参数
function push_back(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
var a = [4];
push_back(a, 2, 3, 4, 5);
// 4.可选参数 必须要放到后面
function buildNames(lastName, firstName) { }
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
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log(1);
    };
    return Animal;
}());
// Tabnine - Code Faster with the All-Language AI Assistant for Code Completion, autocomplete JavaScript, Python, TypeScript, PHP, Go, Java, node.js, Ruby, C/C++, HTML/CSS, C#, Rust, SQL, Bash, Kotlin, R
// 1.类即可是 实体类 也可是 类型
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () { };
    return Dog;
}(Animal));
var dog = new Dog();
var s2 = [dog];
// #私有符 与 private 区别
var Demo = /** @class */ (function () {
    function Demo() {
        this.num = 20;
    }
    return Demo;
}());
var s = new Demo();
// console.log(s.num)
var Demo1 = /** @class */ (function () {
    function Demo1() {
        _num.set(this, void 0);
        __classPrivateFieldSet(this, _num, 20);
    }
    return Demo1;
}());
_num = new WeakMap();
var s1 = new Demo();
// console.log(s1.num)
// # 私有修饰符 用了 weakMap
/**
 * 类型断言
 */
// 类型断言
function getLength1(str) {
    if (str.length) {
        return str.length; // (str as string).length
    }
    else {
        return str.toString().length;
    }
}
function getLength2(str) {
    if (typeof str === "string") {
        return str.length;
    }
    else {
        return str.toString().length;
    }
}
function getName(n) {
    if (typeof n === "string") {
        return n;
    }
    else {
        return n();
    }
}
function identify(arg) {
    return arg;
}
identify("京城一灯");
// 既能当类型、也能当实体类
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 2;
myGenericNumber.add = function (x, y) {
    return x + y;
};
function add() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    var first = rest[0];
    if (typeof first === "number") {
        return rest.reduce(function (pre, cur) { return pre + cur; });
    }
    if (typeof first === "string") {
        return rest.join("");
    }
}
console.log(add(1, 2));
console.log(add("a", "v"));
// 使用泛型实现重载
function getData(value) {
    return value;
}
getData(1);
var getData2 = function (value) {
    console.log(value);
};
getData2("2");
var BookmarkService = /** @class */ (function () {
    function BookmarkService() {
        this.items = [];
    }
    return BookmarkService;
}());
var s3 = new BookmarkService();
s3.items = [{ msg: "1" }];
