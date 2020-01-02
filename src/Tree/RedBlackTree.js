import {
    RBTreeNode,
    NODE_COLOR_RED,
    NODE_COLOR_BLACK,
} from './TreeNode'
import {
    BalencedBinarySearchTree
} from './BalencedBinarySearchTree'

/**
 * RedBlackTree 红黑树
 *
 * @export
 * @class RedBlackTree
 * @extends {BinarySearchTree}
 */
export class RedBlackTree extends BalencedBinarySearchTree {
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

            let grand = parent.parent
            let parent = node.parent

            // 父红叔红祖黑：变色=>递归
            if (node.parent.sibling && node.parent.sibling.isRed) {
                // -> 变色：父黑叔黑祖红
                parent.color(NODE_COLOR_BLACK)
                parent.sibling.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)

                // -> 将 grand 作为新节点递归添加
                this.__afterInsertNode(grand)
                return
            }

            // parent is Red and uncle is Black (contains NIL)
            // ↓ 父红叔黑（含空）祖黑：变色+旋转

            // 判断是否到达根节点，到达时需修改 root 指向
            let reachRoot = (grand === this.__root)

            // [Case-1 LL] 左子 + 左子 : grand 绕 parent 右旋
            if (parent.isLeftChild && node.isLeftChild) {
                // -> 变色
                parent.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)

                // -> 旋转
                this.rotateRight(grand, parent)

                if (reachRoot) {
                    this.__root = parent
                }
            }
            // [Case-2 RR] 右子 + 右子 ： grand 绕 parent 左旋
            else if (parent.isRightChild && node.isRightChild) {
                // -> 变色
                parent.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)

                // -> 旋转
                this.rotateLeft(grand, parent)

                if (reachRoot) {
                    this.__root = parent
                }
            }
            // [Case-3 LR] 左子 + 右子: 先拉直，再按 [Case-1 LL] 变换
            else if (parent.isLeftChild && node.isRightChild) {
                // -> 拉直：parent 绕当前节点 node 左旋
                this.rotateLeft(parent, node)

                // node 已与 parent 对调，以下同 Case-1
                // -> 变色
                node.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)

                // -> 旋转
                this.rotateRight(grand, node)

                if (reachRoot) {
                    this.__root = node
                }
            }
            // [Case-4 RL] 右子 + 左子: 先拉直，再按 [Case-2 RR] 变换
            else {
                // -> 拉直: parent 绕当前节点右旋
                this.rotateRight(parent, node)

                // node 已与 parent 对调，以下同 Case-2
                // -> 变色
                node.color(NODE_COLOR_BLACK)
                grand.color(NODE_COLOR_RED)

                // -> 旋转
                this.rotateLeft(grand, node)

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

    /**
     * 添加节点
     *
     * @param {*} data
     * @memberof RedBlackTree
     */
    insert(data) {

        // 1.创建新节点
        let newNode = new RBTreeNode(data)

        // 2.插入新节点     
        if (this.__root === null) {
            this.__root = newNode
        } else {
            newNode = this.__insertNode(this.__root, newNode)
        }

        this.__afterInsertNode(newNode)
    }

    /**
     * 删除节点
     *
     * @param {*} data
     * @memberof RedBlackTree
     */
    remove(data) {
        // TODO
    }
}