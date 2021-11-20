function foo() {
  try {
    console.log("2");
    return 43;
  } catch (e) {
    console.log(e);
  } finally {
    console.log(12);
    break;
  }
}

function foo1(){
    bar: {
        try {
            return 43
        } finally {
            break bar
        }
    }
    console.log('crazy')
    return 'hello'
}

console.log(foo1());
