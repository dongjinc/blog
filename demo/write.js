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
  console.log(res, obj)
  // obj.__proto__ = constructor.prototype

}

function Student(name, age){
  this.name = name;
  this.age = age;
  // this.doSth();
  // return Error();
}

objectFactory(Student, 'd', 18)