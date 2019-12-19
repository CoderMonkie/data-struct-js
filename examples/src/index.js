// const { deepCopy, isFunction } = require('../../lib/common_utils')
// const ArrayBasedStruct = require('../../lib/ArrayBasedStruct')
const Stack = require('../../src/Stack.js')

var stack = new Stack()
for (var i = 0; i < 5; i++) {
    stack.push(i)
}
console.log('isEmpty: ', stack.isEmpty())
console.log('size: ', stack.size())
console.log(stack.toString())
while (stack.size()) {
    console.log(`pop: `, stack.pop())
}
console.log('isEmpty: ', stack.isEmpty())
console.log('size: ', stack.size())