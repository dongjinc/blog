---
title: 数组方法大全
---

### Array.prototype[@@iterator]()

- 语法 arr[Symbol.iterator]()
- 返回值 数组的 iterator 方法，默认情况下，与 values 返回值相同
- Symbol.iterator 为每一个对象定义了默认的迭代器.该迭代器可以被 for...of 循环

```js
var arr = ["a", "b", "c", "d"];
/** 第一种 */
// for(let letter of arr){
//     console.log(letter)
// }
// console.log(arr.values())
/** 第二种 */
// var eArr = arr[Symbol.iterator]()
// for(let letter of eArr){
//     console.log(letter)
// }
// arr.values() 返回 Array Iterator {} 与 arr和eArr等价
/** 第三种 */
var eArr = arr[Symbol.iterator]();
console.log(eArr.next().value);
console.log(eArr.next().value);
console.log(eArr.next().value);
// String和Array 原型链含有Symbol.iterator,表示可 for...of
```

- 内置类型拥有默认的@@iterator 方法

  - Array.prototype[@@iterator]()
  - TypedArray.prototype[@@iterator]()
  - String.prototype[@@iterator]()
  - Map.prototype[@@iterator]()
  - Set.prototype[@@iterator]()

- 以下方法会返回一个 Array Iterator 对象()

  - Array.prototype.keys()
  - Array.prototype.entries()
  - Array.prototype.values()

- 索引键的 Array Iterator 对象 注意: **索引迭代器会包含哪些没有对应元素的索引** (keys/entries/values)

```js
var arr = ["a", , , "d"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '3']
console.log(denseKeys); // [0, 1, 2, 3]
```

### Array.prototype.keys() 返回一个包含数组每个索引键的 Array Iterator 对象

```js
const array1 = ["a", "b", "c"];
const iterator = array1.keys();
for (const key of iterator) {
  console.log(key);
}
```

### Array.prototype.entries() 返回一个新的 Array Iterator 对象,该对象包含数组每个索引的键/值对
