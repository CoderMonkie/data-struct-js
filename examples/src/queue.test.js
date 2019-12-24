import Queue from '../../lib/Queue'

export default function testQueue() {

    console.log('----------Test: Queue----------')

    var queue = new Queue()
    for (var i = 0; i < 5; i++) {
        queue.enque(i)
    }
    console.log('isEmpty: ', queue.isEmpty)
    console.log('size: ', queue.size)
    console.log(`deque: `, queue.deque())
    
    queue.traverse((ele, index) => {
        console.log(`Traversing-Queue:${index}: ${ele}`)
    })

    console.log(`claer: `, queue.clear())
    console.log('isEmpty: ', queue.isEmpty)
    console.log('size: ', queue.size)
}