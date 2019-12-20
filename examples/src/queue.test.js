import Queue from '../../lib/Queue'

export default testQueue = function() {

    console.log('----------Test: Queue----------')

    var queue = new Queue()
    for (var i = 0; i < 5; i++) {
        queue.push(i)
    }
    console.log('isEmpty: ', queue.isEmpty)
    console.log('size: ', queue.size)
    console.log(queue.toString())
    console.log(`pop: `, queue.pop())
    
    queue.traverse((ele,index)=>{
        console.log(`Traversing-Queue:${index}: ${ele}`)
    })
    
    console.log(`claer: `, queue.clear())
    console.log('isEmpty: ', queue.isEmpty)
    console.log('size: ', queue.size)
}