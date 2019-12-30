// const { RedBlackTree } = require('data-struct-js')
const { RedBlackTree } = require('../../lib/Tree/RedBlackTree')

function testRedBlackTree() {

    console.log('----------Test: RedBlackTree----------')

    let rbt = new RedBlackTree()

    rbt.insert(10, 10)
    rbt.insert(9, 9)
    rbt.insert(8, 8)
    rbt.insert(7, 7)
    rbt.insert(6, 6)
    rbt.insert(5, 5)
    rbt.insert(4, 4)
    rbt.insert(3, 3)
    rbt.insert(2, 2)
    rbt.insert(1, 1)

    // 创建二叉搜索树
    console.log(`1. Insert Nodes to make a RedBlackTree`)
    debugger

}
module.exports = testRedBlackTree