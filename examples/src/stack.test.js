import Stack from '../../lib/Stack'

export default function testStack() {

    console.log('----------testStack----------')

    var stack = new Stack()
    for (var i = 0; i < 5; i++) {
        stack.push(i)
    }
    console.log('isEmpty: ', stack.isEmpty)
    console.log('size: ', stack.size)
    console.log(stack.toString())
    console.log(`pop: `, stack.pop())
    
    stack.traverse((ele,index)=>{
        console.log(`Traversing-Stack:${index}: ${ele}`)
    })
    
    stack.traverse((ele,index)=>{
        console.log(`Traversing-Stack:${index}: ${ele}`)
    }, true)
    
    console.log(`claer: `, stack.clear())
    console.log('isEmpty: ', stack.isEmpty)
    console.log('size: ', stack.size)
}