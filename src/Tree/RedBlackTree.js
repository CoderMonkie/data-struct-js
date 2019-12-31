import {
    RBTreeNode,
    NODE_COLOR_RED,
    NODE_COLOR_BLACK,
} from './TreeNode'
import {
    BinarySearchTree
} from './BinarySearchTree'

export class RedBlackTree extends BinarySearchTree {
    constructor(customizedComparer) {
        super(customizedComparer)

        /**
         * 插入节点后检查是否符合红黑树规则并适当调整
         * 
         * @param {RBTreeNode} node 红黑树节点
         */
        this.__afterInsertNode = function (node) {
            // 到达根节点
            if (node.parent === null) {
                if (node.isRed) {
                    node.color(NODE_COLOR_BLACK)
                }
                return
            }

            // 父节点黑色
            if (node.parent.isBlack) {
                return
            }

            // --- now: node.parent.isRed ---

            let parent = node.parent
            let grand = parent.parent

            // 父红叔红祖黑：变色=>递归
            if (node.parent.sibling && node.parent.sibling.isRed) {
                // -> 变色：父黑叔黑祖红
                parent.color(NODE_COLOR_BLACK)
                parent.sibling.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)
                // -> 递归
                this.__afterInsertNode(grand)
                return
            }
            // parent is Red and uncle is Black (contains NIL)
            // ↓
            let reachRoot = (grand === this.__root)
            // 父红叔黑祖黑：变色=>旋转
            // -> 旋转
            // --> 左子 + 左子 : Grand 绕 Parent 右旋
            if (parent.isLeftChild && node.isLeftChild) {
                // -> 变色
                parent.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)
                // -> 旋转
                parent.parent = grand.parent
                // grand.parent && (grand.parent.left = parent)
                if (grand.parent) {
                    grand.isLeftChild && (grand.parent.left = parent)
                    grand.isRightChild && (grand.parent.right = parent)
                }
                grand.parent = parent
                grand.left = parent.right
                parent.right = grand

                if (reachRoot) {
                    this.__root = parent
                }
            }
            // --> 右子 + 右子 ： Grand 绕 Parent 左旋
            else if (parent.isRightChild && node.isRightChild) {
                // -> 变色
                parent.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)
                //  旋转
                parent.parent = grand.parent
                // grand.parent && (grand.parent.right = parent)
                if (grand.parent) {
                    grand.isLeftChild && (grand.parent.left = parent)
                    grand.isRightChild && (grand.parent.right = parent)
                }
                grand.parent = parent
                grand.right = parent.left
                parent.left = grand

                if (reachRoot) {
                    this.__root = parent
                }
            }
            // --> 左子 + 右子
            else if (parent.isLeftChild && node.isRightChild) {
                // 先变形成直线型[左+左]
                // ---> Parent 绕 Current 左旋
                node.parent = grand
                grand.left = node
                parent.parent = node
                parent.right = node.left
                node.left = parent
                // 再按左左型右旋（此时 Parnet处为 Current）
                // -> 变色
                node.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)
                // 旋转
                node.parent = grand.parent
                // grand.parent && (grand.parent.left = node)
                if (grand.parent) {
                    grand.isLeftChild && (grand.parent.left = node)
                    grand.isRightChild && (grand.parent.right = node)
                }
                grand.parent = node
                grand.left = node.right
                node.right = grand

                if (reachRoot) {
                    this.__root = node
                }
            }
            // --> 右子 + 左子
            else {
                // 先变形成直线型[右+右]，再左旋
                node.parent = grand
                grand.right = node
                parent.parent = node
                parent.left = node.left
                node.right = parent
                // -> 变色
                node.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)
                // 旋转
                node.parent = grand.parent
                // grand.parent && (grand.parent.right = node)
                if (grand.parent) {
                    grand.isLeftChild && (grand.parent.left = node)
                    grand.isRightChild && (grand.parent.right = node)
                }
                grand.parent = node
                grand.left = node.right
                node.right = grand

                if (reachRoot) {
                    this.__root = node
                }
            }
            return
        }

        this.__removeNode = function (data, root) {
            // TODO
        }
    }

    insert(data) {

        // 1.创建新节点
        let newNode = new RBTreeNode(data)

        // 2.插入新节点
        // this.__root = this.__insert(this.__root, newNode)        
        if (this.__root === null) {
            this.__root = newNode
        } else {
            newNode = this.__insertNode(this.__root, newNode)
        }

        this.__afterInsertNode(newNode)
    }

    remove(data) {
        // TODO
    }
}