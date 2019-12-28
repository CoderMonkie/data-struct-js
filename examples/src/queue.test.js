const { Queue } = require('data-struct-js')

function testQueue() {

    console.log('----------Test: Queue----------')

    var queue = new Queue()
    for (var i = 0; i < 5; i++) {
        queue.enqueue(i)
    }
    console.log('isEmpty: ', queue.isEmpty)
    console.log('size: ', queue.size)
    console.log(`dequeue: `, queue.dequeue())

    queue.traverse((ele, index) => {
        console.log(`Traversing-Queue:${index}: ${ele}`)
    })

    console.log(`claer: `, queue.clear())
    console.log('isEmpty: ', queue.isEmpty)
    console.log('size: ', queue.size)
}
module.exports = testQueue