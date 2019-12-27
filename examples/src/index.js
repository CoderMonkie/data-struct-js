import testStack from './stack.test'
import testQueue from './queue.test'
import testProirityQueue from './priorityqueue.test'
import testLinkedList from './linkedlist.test'
import testDoublyLinkedList from './doublylinkedlist.test'
import testCircleLinkedList from './circlelinkedlist.test'
import testHashTable from './hashtable.test'
import testBinarySearchTree from './binarysearchtree.test'

// 清空页面上的 log 信息
btnClear.onclick = function (e) {
    document.querySelectorAll('.log-info').forEach(ele => {
        document.body.removeChild(ele)
    })
}

// 分别运行各数据结构类的样例代码
btnContainer.onclick = function (e) {
    let targetFunc
    switch (e.target.id) {
        case btnStack.id:
            targetFunc = testStack
            break
        case btnQueue.id:
            targetFunc = testQueue
            break
        case btnPriorityQueue.id:
            targetFunc = testProirityQueue
            break
        case btnLinkedList.id:
            targetFunc = testLinkedList
            break
        case btnDoublyLinkedList.id:
            targetFunc = testDoublyLinkedList
            break
        case btnCircleLinkedList.id:
            targetFunc = testCircleLinkedList
            break
        case btnHashTable.id:
            targetFunc = testHashTable
            break
        case btnBinarySearchTree.id:
            targetFunc = testBinarySearchTree
            break
        default:
            break;
    }

    if (targetFunc) {
        btnClear.click()
        targetFunc()
    }
}