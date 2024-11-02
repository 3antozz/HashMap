const { HashMap } = require("./HashClass.js");

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('g', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('abcd', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

test.set('lion', 'OVERWRITTEN')
test.set('jacket', 'OVERWRITTEN');
test.set('apple', 'OVERWRITTEN');
console.log(test)
test.set('f', 'silver');
test.set('zerz', 'OVERWRITTEN');
console.log(test);

console.log(test.length());
console.log(test.remove('zerz'));
console.log(test.entries());




// debugger;
