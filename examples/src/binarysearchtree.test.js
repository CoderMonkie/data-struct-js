const { BinarySearchTree } = require('data-struct-js')

function testBinarySearchTree() {

    console.log('----------Test: BinarySearchTree----------')



    let bst = new BinarySearchTree()

    bst.insert(8)
    bst.insert(6)
    bst.insert(13)
    bst.insert(4)
    bst.insert(7)
    bst.insert(11)
    bst.insert(3)
    bst.insert(5)
    bst.insert(10)
    bst.insert(20)
    bst.insert(12)
    bst.insert(16)
    bst.insert(35)
    bst.insert(9)
    bst.insert(18)
    bst.insert(19)

    // 创建二叉搜索树
    console.log(`1. Insert Nodes to make a BinarySearchTree`)
    console.log(bst.toString())
    console.log(`该树的高度为：${bst.height}`)
    console.log(`
    /**
     * 
     *              8
     *     ------------------
     *     |                |
     *     6                13
     *  ---------     ---------------
     *   |    |       |             |  
     *   4    7       11            20
     * -----       -------      ----------
     * |   |       |     |      |        |
     * 3   5       10    12     16       35
     *           -----        ------ 
     *           |                 |
     *           9                 18
     *                            -----
     *                                |
     *                                19
     * 
     */
    `)


    // 遍历二叉搜索树
    console.log(`2. Traverse a BST`)

    const traverseCallbackFunc = function (value) {
        console.log(`Traversing!\r\n==>current is [${value}]`)
    }

    // 这里的序，指的是访问 ROOT 的顺序，相较于 left/right 两个子节点

    // 中序遍历
    console.log(`2.1 inOrderTraverse:  left->ROOT->right`)
    bst.inOrderTraverse(traverseCallbackFunc)

    // 前序遍历
    console.log(`2.2 preOrderTraverse: ROOT->left->right`)
    bst.preOrderTraverse(traverseCallbackFunc)

    // 后序遍历
    console.log(`2.3 postOrderTraverse:left->right->ROOT`)
    bst.postOrderTraverse(traverseCallbackFunc)

    // 层序遍历
    console.log(`2.4 levelOrderTraverse:ROOT->next-level-roots`)
    bst.levelOrderTraverse(traverseCallbackFunc)

    // 删除二叉搜索树的节点
    console.log(`3. Remove nodes of a  BST`)
    console.log('remove 13', bst.remove(13))
    console.log('remove 11', bst.remove(11))
    console.log('remove 5', bst.remove(5))
    console.log('remove 4', bst.remove(4))  // true
    console.log('remove 4', bst.remove(4))  // false
}

module.exports = testBinarySearchTree