/*
 * @Date         : 2019-12-27 19:42:05
 * @LastEditors  : Mao NianYou
 * @LastEditTime : 2020-01-25 21:51:25
 */
const testStack = require('./stack.test')
const testQueue = require('./queue.test')
const testProirityQueue = require('./priorityqueue.test')
const testLinkedList = require('./linkedlist.test')
const testDoublyLinkedList = require('./doublylinkedlist.test')
const testCircleLinkedList = require('./circlelinkedlist.test')
const testHashTable = require('./hashtable.test')
const testBinarySearchTree = require('./binarysearchtree.test')
const testRedBlackTree = require('./redblacktree.test')
const testDirectedGraph = require('./directedgraph.test')
const testUndirectedGraph = require('./undirectedgraph.test')

// 清空页面上的 log 信息
btnClear.onclick = function (e) {
    document.querySelectorAll('.log-info').forEach(ele => {
        document.body.removeChild(ele)
        console.clear()
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
        case btnRedBlackTree.id:
            targetFunc = testRedBlackTree
            break
        case btnDirectedGraph.id:
            targetFunc = testDirectedGraph
            break
        case btnUndirectedGraph.id:
            targetFunc = testUndirectedGraph
            break
        default:
            break;
    }

    if (targetFunc) {
        btnClear.click()
        targetFunc()
    }
}