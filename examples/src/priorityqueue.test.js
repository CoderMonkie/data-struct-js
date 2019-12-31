const { PriorityQueue } = require('data-struct-js')

function testPriorityQueue() {

    console.log('----------Test: PriorityQueue----------')

    var pQueue = new PriorityQueue()

    pQueue.enqueue({
        name: 'Apple',
        price: '8',
        toString: function () { return `{${this.name} : ${this.price}}` }
    }, 2)
    pQueue.enqueue({
        name: 'Banana',
        price: '6',
        toString: function () { return `{${this.name} : ${this.price}}` }
    }, 4)
    pQueue.enqueue({
        name: 'Strawberry',
        price: '18',
        toString: function () { return `{${this.name} : ${this.price}}` }
    }, 1)
    pQueue.enqueue({
        name: 'Pear',
        price: '5',
        toString: function () { return `{${this.name} : ${this.price}}` }
    }, 3)

    console.log('isEmpty: ', pQueue.isEmpty)
    console.log('size: ', pQueue.size)
    console.log(pQueue.toString())
    console.log(`dequeue: `, pQueue.dequeue())

    pQueue.traverse((ele, index) => {
        console.log(`Traversing-PriorityQueue:${index}: ${ele}`)
    })

    console.log(`claer: `, pQueue.clear())
    console.log('isEmpty: ', pQueue.isEmpty)
    console.log('size: ', pQueue.size)
}

module.exports = testPriorityQueue