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
 * @description
 * 非完美平衡二叉搜索树
 * 完美黑色平衡二叉搜索树
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

            let parent = node.parent
            let grand = parent.parent

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

        // TODO
        this.__removeNode = function (data, root) {
            if (root == null) return null

            // 查找左子树
            if (this.__comparator(data, root.data) === COMPARE_LESS) {
                root.left = this.__removeNode(data, root.left)
                return root
            }
            // 查找右子树
            else if (this.__comparator(data, root.data) === COMPARE_GREATER) {
                root.right = this.__removeNode(data, root.right)
                return root
            }

            // --找到要删除的节点对象--

            // 既有左子树又有右子树
            if (root.left != null && root.right != null) {
                let minInRight = root.right
                while (minInRight.left) {
                    minInRight = minInRight.left
                }

                // => 转变为删除后继节点 minInRight
                // minInRight 只有以下三种情况：
                // Case-1：红色叶子节点
                // Case-2：黑色叶子节点
                // Case-3：黑色节点 + 红色右子节点
                // 这三种情况外层分支已覆盖，都在递归中进入相应分支处理
                // 这里只记录后继的数据值并赋给原删除对象 root 节点
                let data = minInRight.data
                this.__removeNode(data, minInRight)
                root.data = data
            }
            // 只有左子树（只能是black-red）
            else if (root.left != null) {
                root.data = root.left.data
                root.left = null
            }
            // 只有右子树（只能是black-red）
            else if (root.right != null) {
                root.data = root.right.data
                root.right = null
            }
            // 没有任何子节点（叶子节点）
            // 删除对象为红色叶子节点
            else if (root.color === NODE_COLOR_RED) {
                // 直接删除
                root = null
            }
            // 删除对象为黑色叶子节点
            else {
                root = this.__removeBlackLeaf(root)
            }

            return root
        }


        this.__removeBlackLeaf = function (node, deleteFlag = false) {
            let parent = node.parent

            if (parent === null) {
                // 删除的是根节点
                node = null
                return null
            }
            let grand = parent.parent
            let uncle = parent.sibling
            const needStraighten = node.isLeftChild === parent.isLeftChild

            // // 红色父节点
            // if (parent.isRed) {
            //     // 父红兄黑近侄红：兄侄旋转+黑红黑（父兄侄）
            //     if (node.nearNephew && !node.farNephew) {
            //         // 兄侄按node所在方向的反向旋转
            //         this.rotate(node.sibling, node.nearNephew, node.isLeftChild)
            //         // 旋转后变形为：父红兄黑远红侄
            //     }

            //     // 有侄子节点时
            //     // 父红兄黑+[双红侄]或[远红侄]
            //     if (!node.sibling.isLeaf) {
            //         // 变色保证[黑红黑]
            //         parent.color(NODE_COLOR_BLACK)
            //         node.sibling.color(NODE_COLOR_RED)
            //         node.sibling.color(NODE_COLOR_BLACK)
            //     }

            //     // 向删除节点的方向倾斜（下沉以获取更多黑色节点来做补充）
            //     this.rotate(parent, node.sibling, node.isRightChild)

            //     node = null
            //     return null
            // }
            // // else 黑色父节点：此时必然三黑
            // else if (grand === null) {
            //     // 父黑根节点：兄变红即可
            //     node.sibling.color(NODE_COLOR_RED)
            //     node = null
            //     return null
            // }
            // // 父黑叔红的情况：此时必然：表兄双黑
            // else if (uncle.isRed) {
            //     // 变色
            //     uncle.color(NODE_COLOR_BLACK) // 将调整为新grand，需变黑
            //     parent.nearNephew.color(NODE_COLOR_RED)

            //     if (needStraighten) {
            //         // 旋转1：父兄拉直
            //         this.rotate(parent, node.sibling, parent.isRightChild)

            //         parent.color(NODE_COLOR_RED)
            //     }
            //     else {
            //         node.sibling.color(NODE_COLOR_RED)
            //     }

            //     // 旋转2：祖叔旋转
            //     this.rotate(grand, uncle, parent.isRightChild)

            //     node = null
            //     return null
            // }
            // // 父黑叔黑的情况：看近表兄节点颜色来进行颜色变化
            // // 近表兄红色：黑红黑
            // // 近表兄黑色：红黑红
            // else {
            //     if(parent.nearNephew.isRed) {
            //         parent.farNephew.color(NODE_COLOR_BLACK)
            //         if (needStraighten) {
            //             // 旋转1：父兄拉直
            //             this.rotate(parent, node.sibling, parent.isRightChild)

            //             parent.color(NODE_COLOR_RED)
            //         }
            //         else {
            //             node.sibling.color(NODE_COLOR_RED)
            //         }
            //     }
            //     // parent.nearNephew.isBlack
            //     else {
            //         grand.color(NODE_COLOR_RED)
            //         if (needStraighten) {
            //             // 旋转1：父兄拉直
            //             this.rotate(parent, node.sibling, parent.isRightChild)

            //             parent.color(NODE_COLOR_RED)
            //         }
            //         else {
            //             node.sibling.color(NODE_COLOR_RED)
            //         }
            //     }

            //     // 旋转2：祖叔旋转
            //     this.rotate(grand, uncle, parent.isRightChild)
            // }
        }

        /**
         * 失黑调整
         *  
         * @description __fixLostBlack参考自av30515237
         */
        this.__fixLostBlack = function (node) {

            while (node !== this.__root) {
                let parent = node.parent
                let brother = node.sibling

                // LB-1：父黑兄红双黑侄
                if (brother.isRed) {
                    this.rotate(parent, node.isRightChild)
                    brother.color(NODE_COLOR_BLACK)
                    parent.color(NODE_COLOR_RED)
                    // 此时已变为LB-2R：父红兄黑无红侄（0侄子）

                    if (this.__root === parent) {
                        this.__root = brother
                    }

                    brother = node.sibling
                    parent = node.parent
                }

                // LB-3：兄黑红侄
                if (brother.left && brother.left.isRed) {
                    let oldColor = parent.isRed
                    parent.color(NODE_COLOR_BLACK)

                    if (parent === this.__root) {
                        this.__root = brother
                    }

                    if (node.isLeftChild) { // 近侄红
                        this.rotateRight(brother)
                        this.rotateLeft(parent)
                    } else {
                        brother.left.color(NODE_COLOR_BLACK)
                        this.rotateRight(parent)
                    }
                    parent.parent.color(oldColor)
                    return
                }
                // 对称的LB-3
                else if (brother.right && brother.right.isRed) {
                    let oldColor = parent.isRed
                    parent.color(NODE_COLOR_BLACK)

                    if (parent === this.__root) {
                        this.__root = brother
                    }

                    if (node.isLeftChild) {
                        brother.right.color(NODE_COLOR_BLACK)
                        this.rotateLeft(parent)
                    }
                    // 近侄红
                    else {
                        this.rotateLeft(brother)
                        this.rotateRight(parent)
                    }
                    parent.parent.color(oldColor)
                    return
                }

                // LB-2R：父红兄黑（无红侄）
                if (node.parent.isRed) {
                    parent.color(NODE_COLOR_BLACK)
                    brother.color(NODE_COLOR_RED)
                    return
                }
                // LB-2B：父黑兄黑（无红侄）
                else {
                    brother.color(NODE_COLOR_RED)

                    // 递归
                    node = parent
                }
            }
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
     * @description
     * 两种实现方式：
     *      递归法：__removeNode
     *      迭代法：remove/__fixLostBlack
     */
    remove(data) {
        let nodeToDelete = this.__searchNode(data, this.__root)
        if (!nodeToDelete) return false

        let successorNode = null
        this.__size -= 1

        while (nodeToDelete.left || nodeToDelete.right) {
            // 只有红右子节点
            if (!nodeToDelete.left) {
                successorNode = nodeToDelete.right
            }
            // 只有红左子节点
            else if (!nodeToDelete.right) {
                successorNode = nodeToDelete.left
            }
            // 左右都存在子节点时找后继
            else {
                successorNode = this.__successor(nodeToDelete.right)
            }
            nodeToDelete.data = successorNode.data

            // 迭代
            nodeToDelete = successorNode
        }

        if (nodeToDelete.isBlack) {
            // balance
            this.__fixLostBlack(nodeToDelete)
        }

        if (nodeToDelete.parent) {
            nodeToDelete.isLeftChild && (nodeToDelete.parent.left = null)
            nodeToDelete.isRightChild && (nodeToDelete.parent.right = null)
        }

        if (nodeToDelete === this.__root) {
            this.__root = null
        }

        return true
    }
}