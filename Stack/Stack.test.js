// ---------------------------------------------
// Test: Stack
// ---------------------------------------------

var s = new Stack()
for (var i = 0; i < 5; i++) {
    s.push(i)
}
console.log('isEmpty: ', s.isEmpty())
console.log('size: ', s.size())
console.log(s.toString())
while (s.size()) {
    console.log(`pop: `, s.pop())
}
console.log('isEmpty: ', s.isEmpty())
console.log('size: ', s.size())

// ---------------------------------------------
// Test: dec2bin
// ---------------------------------------------

var ret = dec2bin(8)
console.log(' 8 => ', ret)    // 1000

ret = dec2bin(-8)
console.log('-8 => ', ret)    // 1 1000

// ---------------------------------------------
// getItems
s.clear()
s.push(22)
s.push(33)
var data = s.getItems()
data[0] = 11
console.log('reference test: ', s.getItems())