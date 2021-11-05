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

### Array.prototype.at() 根据数组 index 返回对应的 value

```js
const array1 = [1, 35, 67, 34, 123];
array1.at(-1); // 获取最后一位
array1.at(5); // undefined 对于不存在的 index
```

### Array.prototype.concat()

- 合并两个或更多数组，不会修改原数组，会返回一个新数组

  ```js
  const array1 = ["a", "b", "c"];
  const array2 = ["d", "e", "f"];
  const array3 = array1.concat(array2); // ["a", "b", "c", "d", "e", "f"]
  const array4 = array1.concat(array2, array1); // ["a", "b", "c", "d", "e", "f", "a", "b", "c"]
  ```

- 如果其参数不是数组，依然会合并数值到新的数组中
  ```js
  const array1 = ["a", "b", "c"];
  const array2 = array1.concat(array1, 1, 2, c); // ['a', 'b', 'c', 'a', 'b', 'c', 1, 2, 'c']
  ```
- concat 方法是浅拷贝，原数组和新数组都指向了同一个对象

  ```js
  const array1 = [
    { name: "dong", age: 13 },
    { name: "yu", age: 16 },
  ];
  const array2 = [
    { name: "san", age: 21 },
    { name: "love", age: 11 },
  ];
  const array3 = array1.concat(array2); // [{ name: "dong", age: 13 },{ name: "yu", age: 16 },{ name: "san", age: 21 },{ name: "love", age: 11 }]
  // 原数组值被修改，合并后的新数组也随之改变，反之亦然。
  array1[0].name = "jk";
  console.log(array3); // [{ name: "jk", age: 13 },{ name: "yu", age: 16 },{ name: "san", age: 21 },{name: "love", age: 11 }]
  // 合并后的数组值修改，原数组的值也会被修改
  array3[0].age = 9;
  console.log(array1); // [{ name: "jk", age: 9 },{ name: "yu", age: 16 }]
  ```

- 链接嵌套数组
  ```js
  const num1 = [[1]];
  const num2 = [2, [3]];
  const numbers = num1.concat(num2); // [[1], 2, [3]];
  // 修改原数组值
  num1.push(3);
  console.log(numbers); // [[1, 3], 2, [3]];
  ```
