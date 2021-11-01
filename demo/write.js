// 手写instanceof
/**
 * instanceof作用
 * 判断一个实例是否是其父类或者祖先类型的实例
 */
// https://segmentfault.com/a/1190000038910420
const myInstanceOf = (target, origin) => {
  while (target) {
    if (target.__proto__ === origin.prototype) {
      return true;
    }
    target = target.__proto__;
  }
  return false;
};

/**
 * new实现
 */
function objectFactory(){
  // 取构造函数
  const constructor = [].shift.call(arguments)
  if(typeof constructor !== 'function'){
    throw new Error('constructor must be a function')
  }
  // Object.setPrototypeOf(obj, Constructor.prototype)来设置原型对象
  const obj = Object.create(constructor.prototype)
  const res = constructor.apply(obj, arguments)
  return typeof res === 'object' ? res : obj
}

function Student(name, age){
  this.name = name;
  this.age = age;
}

objectFactory(Student, 'd', 18)

/**
 * 数组扁平化
 * 把多维数组转化成一维数组
 */
const arr1 = [1, [2, 3, [2]]]
arr1.flat() // [1, 2, 3, Array(2)]
arr1.flat(2) // [1, 2, 3, 2]
// 需要知道扁平化的数组是具体维度才可以
// 可以使用 Infinity
arr1.flat(Infinity) // 无需知道数组的维度


