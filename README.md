# data-struct-js

## About this package

Implement of common data structures using javascript.
besides supplied by JS, such as Array/Set(WeakSet)/Map(WeakMap)

### source code

Write in ES6, using babel to convert to ES5.

You can download and run `npm run compile` with customized babel setting to meet your needs.

## How to use

> more examples see [`data-struct-js/examples`](./examples)

### install the package

```bash
npm install --save-dev data-struct-js
```
or
```bash
npm i -D data-struct-js
```

### then use the data-structures supplied simply as below

```js
const {
    Stack,
    Queue,
    PriorityQueue,
    LinkedList,
    DoublyLinkedList,
    CircleLinkedList,
    HashTalbe,
    BinarySearchTree,
    RedBlackTree,
} = require('data-struct-js')
// Or ↓
// import {
//     Stack,
//     Queue,
//     PriorityQueue,
//     LinkedList,
//     DoublyLinkedList,
//     CircleLinkedList,
//     HashTalbe,
//     BinarySearchTree,
//     RedBlackTree,
// } from 'data-struct-js'
// -> may need webpack and bable-loader environment

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
queue.enqueue('First')
queue.enqueue('Second')
queue.dequeue()   // First
queue.dequeue()   // Second

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
// CircleLinkedList
let circle = new CircleLinkedList()
circle.append("1.Plan")
circle.append("2.Do")
circle.append("3.Check")
circle.append("4.Action")
for (let j = 0; j < 9; j++) {
    const item = circle.getNext()
    console.log(`${j} : ${item}`)
}

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

//----------------------------
// BinarySearchTree
let bst = new BinarySearchTree()
bst.insert(8, "8: eight")
bst.insert(6, "6: six")
bst.insert(13, "13: thirteen")
bst.insert(4, "4: four")
bst.insert(7, "7: seven")
bst.insert(11, "11: eleven")
bst.insert(3, "3: three")
bst.insert(5, "5: five")
bst.insert(10, "10: ten")
bst.insert(20, "20: twenty")
bst.insert(12, "12: twelve")
bst.insert(16, "16: sixteen")
bst.insert(35, "35: thirty-five")
bst.insert(9, "9: nine")
bst.insert(18, "18: eighteen")
bst.insert(19, "19: nineteen")
/**
 * 
 *              8
 *     ------------------
 *     |                |
 *     6                13
 * ---------     ---------------
 *   |    |       |           |  
 *   4    7       11          20
 * -----       -------    ----------
 * |   |       |     |    |       |
 * 3   5       10    12   16      35
 *           -----      ------ 
 *           |               |
 *           9               18
 *                          -----
 *                              |
 *                              19
 * 
 */

var traverseCallbackFunc = function(value) {
    console.log(`Traversing!\r\n==>current is [${value}]`)
}
bst.inOrderTraverse(traverseCallbackFunc)

bst.remove(13)
// ⬇️
/**
 * 
 *              8
 *     ------------------
 *     |                |
 *     6                16
 * ---------     ---------------
 *   |    |       |           |  
 *   4    7       11          18
 * -----       -------    ----------
 * |   |       |     |            |
 * 3   5       10    12           19
 *           -----              ------ 
 *           |                       |
 *           9                       20
*                                  -----
 *                                     |
 *                                     35
 * 
 */
//...
```

## Data structures

### Implement data structures:

+ [Stack](src/Stack.js)
+ [Queue](src/Queue/Queue.js)
+ [PriorityQueue](src/Queue/Queue.js)
+ [LinkedList](src/LinkedList/LinkedList.js)
+ [DoublyLinkedList](src/LinkedList/DoublyLinkedList.js)
+ [CircleLinkedList](src/LinkedList/CircleLinkedList.js)
+ CircleDoublyLinkedList
+ [HashTalbe](src/HashTable/HashTable.js)
+ [BinarySearchTree](src/Tree/BinarySearchTree.js)
+ [RedBlackTree](src/Tree/RedBlackTree.js)

coming soon:
+ Graph

### Original data structures in JavaScript:

+ Array
+ Set/WeakSet
+ Map/WeakMap

> ⬆️ not in this library since you could use them directly.

---

## License

### MIT

Feel free to use it.