# data-struct-js

## About this package

Implement of common data structures using javascript.
besides supplied by JS, such as Array/Set(WeakSet)/Map(WeakMap)

## How to use

install the package
```bash
npm install --save-dev data-struct-js
```
or
```bash
npm i -D data-struct-js
```

then use the data-structures supplied simply as below
```js
import {
    Stack,
    Queue,
    PriorityQueue,
    LinkedList,
    DoublyLinkedList,
    HashTalbe,
} from 'data-struct-js'

//----------------------------
// Stack
let stack = new Stack()
stack.push('Element1')
stack.push('Element2')
stack.pop() // Element2
stack.pop() // Element1

//----------------------------
// Queue
let queue = new Queue()
queue.enque('First')
queue.enque('Second')
queue.deque()   // First
queue.deque()   // Second

//----------------------------
// PriorityQueue
let pq = new PriorityQueue()
pq.enqueue('1-Memory', 1)
pq.enqueue('2-CPU', 0)
pq.enqueue('3-HardDisk', 2)
pq.enqueue('4-Display', 3)
pq.enqueue('5-OperatingSystem', 5)
pq.enqueue('6-Aplication')
// -->
// 0: QueueElement {__element: "2-CPU", __priority: 0, toString: ƒ}
// 1: QueueElement {__element: "1-Memory", __priority: 1, toString: ƒ}
// 2: QueueElement {__element: "3-HardDisk", __priority: 2, toString: ƒ}
// 3: QueueElement {__element: "4-Display", __priority: 3, toString: ƒ}
// 4: QueueElement {__element: "5-OperatingSystem", __priority: 5, toString: ƒ}
// 5: QueueElement {__element: "6-Aplication", __priority: Infinity, toString: ƒ}

//----------------------------
// LinkedList
let linkedList = new LinkedList()
linkedList.append({name: 'CoderMonkey', age: 18})
linkedList.insert(0, {name: 'CoderMonkie',age: 36})
linkedList.remove({name: 'CoderMonkie',age: 36}, function(x, y){ return x.name === y.name})
//...

//----------------------------
// DoublyLinkedList
let doublyLinkedList = new DoublyLinkedList()
const traverseFunc = function(element){
    console.log(element.name, element,age)
}
doublyLinkedList.append({name: 'CoderMonkey', age: 18})
doublyLinkedList.append({name: 'CoderGorilla',age: 19})
doublyLinkedList.insert(0, {name: 'CoderDog',age: 20})
doublyLinkedList.insert(3, {name: 'CoderSheep',age: 21})
doublyLinkedList.traverse(traverseFunc)
doublyLinkedList.traverse(traverseFunc, true)
//...

//----------------------------
// HashTable
let hashTable = new HashTable()
// Add
hashTable.put('One', 'One eyewitness is better than ten hearsays.')
hashTable.put('Two', 'One hour today is worth two tomorrow.')
hashTable.put('Three', 'One boy is a boy, two boys half a boy, three boys no boy.')
hashTable.put('Four', 'Four eyes see more than two.')
// Update
hashTable.put('One', 'One world, one dream.')
// Delete
hashTable.delete('Three')   // true
hashTable.delete('Five')    // false
//...

```

more examples see `data-struct-js/examples`

## Available data structures

+ Stack
+ Queue
+ PriorityQueue
+ LinkedList
+ DoublyLinkedList
+ HashTalbe

---

coming soon..

+ BinarySearchTree
+ BlackRedTree
+ Graph

---