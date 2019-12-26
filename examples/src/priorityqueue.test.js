import PriorityQueue from '../../lib/Queue/PriorityQueue'

export default function testPriorityQueue() {

    console.log('----------Test: PriorityQueue----------')

    var pQueue = new PriorityQueue()
    
    pQueue.enque({
        name: 'Apple',
        price: '8',
        toString: function(){return `{${this.name} : ${this.price}}`}
    }, 2)
    pQueue.enque({
        name: 'Banana',
        price: '6',
        toString: function(){return `{${this.name} : ${this.price}}`}
    }, 4)
    pQueue.enque({
        name: 'Strawberry',
        price: '18',
        toString: function(){return `{${this.name} : ${this.price}}`}
    }, 1)
    pQueue.enque({
        name: 'Pear',
        price: '5',
        toString: function(){return `{${this.name} : ${this.price}}`}
    }, 3)

    console.log('isEmpty: ', pQueue.isEmpty)
    console.log('size: ', pQueue.size)
    console.log(pQueue.toString())
    console.log(`deque: `, pQueue.deque())
    
    pQueue.traverse((ele,index)=>{
        console.log(`Traversing-PriorityQueue:${index}: ${ele}`)
    })
    
    console.log(`claer: `, pQueue.clear())
    console.log('isEmpty: ', pQueue.isEmpty)
    console.log('size: ', pQueue.size)
}