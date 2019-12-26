import BinarySearchTree from '../../lib/Tree/BinarySearchTree'

export default function testBinarySearchTree() {

    console.log('----------Test: BinarySearchTree----------')

    let bst = new BinarySearchTree()

    bst.insert(8, "8: eight")
    bst.insert(6, "6: six")
    bst.insert(13, "13: thirteen")
    bst.insert(4, "4: four")
    bst.insert(7, "7: seven")
    bst.insert(11, "11: eleven")
    bst.insert(3, "3: three")
    bst.insert(10, "10: ten")
    bst.insert(5, "5: five")
    bst.insert(16, "16: sixteen")
    bst.insert(12, "12: twelve")
    bst.insert(14, "14: forteen")
    bst.insert(9, "9: nine")
    bst.insert(15, "15: fifteen")

    // 创建二叉搜索树
    console.log(`1. Insert Nodes to make a BinarySearchTree`)
    console.log(bst)

    console.log(`
    /**
     * 
     *              8
     *     ------------------
     *     |                |
     *     6                13
     * ---------     ---------------
     *   |    |       |           |  
     *   4    7       11          16
     * -----       -------    ----------
     * |   |       |     |     |
     * 3   5       10    12    14
     *           -----        ------ 
     *           |                 |
     *           9                 15
     * 
     */
    `)


    // 遍历二叉搜索树
    console.log(`2. Traverse a BST`)
    
    const traverseCallbackFunc = function(value) {
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
    console.log(`2.3 backOrderTraverse:left->right->ROOT`)
    bst.backOrderTraverse(traverseCallbackFunc)

    
    // 删除二叉搜索树的节点
    console.log(`3. Remove nodes of a  BST`)
    console.log('remove 13', bst.remove(13))
    console.log('remove 11', bst.remove(11))
    console.log('remove 5', bst.remove(5))
    console.log('remove 4', bst.remove(4))  // true
    console.log('remove 4', bst.remove(4))  // false
    console.log(bst)
}