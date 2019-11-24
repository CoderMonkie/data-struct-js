// ---------------------------------------------
// Test: Queue
// ---------------------------------------------

var q = new Queue()
for (var i = 0; i < 5; i++) {
    q.enqueue(i)
}
console.log('isEmpty: ', q.isEmpty())
console.log('size: ', q.size())
console.log('toString: ', q.toString())
while (!q.isEmpty()) {
    console.log(`dequeue: `, q.dequeue())
}
console.log('isEmpty: ', q.isEmpty())
console.log('size: ', q.size())