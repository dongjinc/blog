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
