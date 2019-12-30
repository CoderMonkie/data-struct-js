import {
    RBTreeNode,
    NODE_COLOR_RED,
    NODE_COLOR_BLACK,
} from './TreeNode'


export class RedBlackTree {
    constructor() {

        /**
         * 插入节点方法
         * 
         * @param {RBTreeNode} root 根节点
         * @param {RBTreeNode} newNode 新节点
         */
        this.__insertNode = function (root, newNode) {
            // 1.若 key 相等，则更新该节点的值
            if (root.key === newNode.key) {
                root.value = newNode.value
                return newNode
            }
            // 2.若新节点 key 值小，找左子树插入
            else if (root.key > newNode.key) {
                if (root.left === null) {
                    newNode.parent = root
                    root.left = newNode
                    return newNode                    
                } else {
                    return this.__insertNode(root.left, newNode)
                }
            }
            // 3.若新节点 key 值大，找右子树插入
            else {
                if (root.right === null) {
                    newNode.parent = root
                    root.right = newNode
                    return newNode                    
                } else {
                    return this.__insertNode(root.right, newNode)
                }
            }
        }

        this.__afterInsertNode = function(node) {
            // 到达根节点
            if (node.parent === null) {
                if (node.isRed) {
                    node.color = NODE_COLOR_BLACK
                }
                return
            }

            // 父节点黑色
            if (node.parent.isBlack) {
                return
            }

            // --- now: node.parent.isRed ---

            // 父红叔红祖黑：变色=>递归
            if (node.parent.sibling && node.parent.sibling.isRed) {
                // -> 变色：父黑叔黑祖红
                node.parent.color = NODE_COLOR_BLACK
                node.parent.sibling.color = NODE_COLOR_BLACK
                node.parent.parent.color = NODE_COLOR_RED
                // -> 递归
                this.__afterInsertNode(node.parent.parent)
                return
            }
            // parent is Red and uncle is Black (contains NIL)
            // ↓
            // 父红叔黑祖黑：变色=>旋转
            let parent = node.parent
            let grand = parent.parent
            // -> 旋转
            // --> 左子 + 左子 : Grand 绕 Parent 右旋
            if (parent.isLeftChild && node.isLeftChild) {
                // -> 变色
                parent.color = NODE_COLOR_BLACK
                grand.color = NODE_COLOR_RED
                // -> 旋转
                grand.left = parent.right
                parent.right = grand
            }
            // --> 右子 + 右子 ： Grand 绕 Parent 左旋
            else if (parent.isRightChild && node.isRightChild) {
                // -> 变色
                parent.color = NODE_COLOR_BLACK
                grand.color = NODE_COLOR_RED
                // 
                grand.right = parent.left
                parent.left = grand
            }
            // --> 左子 + 右子
            else if (parent.isLeftChild && node.isRightChild) {
                // 先变形成直线型[左+左]
                // ---> Parent 绕 Current 左旋
                parent.right = node.left
                node.left = parent
                // 再按左左型右旋（此时 Parnet处为 Current）
                // -> 变色
                node.color = NODE_COLOR_BLACK
                grand.color = NODE_COLOR_RED
                // 
                grand.left = node.right
                node.right = grand
            }
            // --> 右子 + 左子
            else {
                // 先变形成直线型[右+右]，再左旋
                parent.left = node.left
                node.right = parent
                // -> 变色
                node.color = NODE_COLOR_BLACK
                grand.color = NODE_COLOR_RED
                // 
                grand.left = node.right
                node.right = grand
            }
            return
        }
    }

    insert(key, value) {

        // 1.创建新节点
        let newNode = new RBTreeNode(key, value)

        // 2.插入新节点
        // this.__root = this.__insert(this.__root, newNode)        
        if (this.__root === null) {
            this.__root = newNode
        } else {
            newNode = this.__insertNode(this.__root, newNode)
        }

        this.__afterInsertNode(newNode)
    }
}