import {
    isFunction,
    comparator,
    COMPARE_EQUAL,
    COMPARE_GREATER
} from "../common/toollib"
import {
    TreeNode
} from './TreeNode'

export class BinarySearchTree {
    constructor(customizedComparer) {
        this.__root = null
        this.__comparator = comparator(customizedComparer)

        /**
         * 插入节点方法
         * @deprecated
         * @param {TreeNode|null} root 根节点
         * @param {TreeNode} newNode 新节点
         * @returns 插入结果 TreeNode
         */
        // this.__insert = function (root, newNode) {

        //     // 1.如果为空节点，则作直接链接该节点
        //     if (root === null) {
        //         return newNode
        //     }
        //     // 2.如果 key 相同，则更新该节点的值
        //     else if (root.key === newNode.key) {
        //         root.data = newNode.data
        //     }
        //     // 3.否则找到合适位置插入
        //     else {
        //         // 3.1.新节点 key 值小，找左子树插入
        //         if (root.key > newNode.key) {
        //             root.left = this.__insert(root.left, newNode)
        //         }
        //         // 3.2.新节点 key 值大，找右子树插入
        //         else {
        //             root.right = this.__insert(root.right, newNode)
        //         }
        //     }

        //     // 4.返回插入结果
        //     return root
        // }

        /**
         * 插入节点方法
         * 
         * @param {TreeNode} root 根节点
         * @param {TreeNode} newNode 新节点
         */
        this.__insertNode = function (root, newNode) {
            // 1.若 key 相等，则更新该节点的值
            if (this.__comparator(root.data, newNode.data) === COMPARE_EQUAL) {
                root.data = newNode.data
                return newNode
            }
            // 2.若新节点 key 值小，找左子树插入
            // else if (root.key > newNode.key) {
            else if (this.__comparator(root.data, newNode.data) === COMPARE_GREATER) {
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

        /**
         * 删除节点方法
         * 
         * @param {*} data data
         * @param {TreeNode} root 节点
         * @returns {TreeNode|null} 删除指定节点后的(子)树
         */
        this.__removeNode = function (data, root) {
            if (root == null) return null

            if (this.__comparator(data, root.data) === COMPARE_LESS) {
                root.left = this.__removeNode(data, root.left)
                return root
            }
            // 
            else if (this.__comparator(data, root.data) === COMPARE_GREATER) {
                root.right = this.__removeNode(data, root.right)
                return root
            }
            //
            else {
                let subTree = null

                // 要删除的节点同时包含左右子树
                if (root.left != null && root.right != null) {

                    // 找到右子树里最小的节点minInRight，替代删除对象节点target
                    let minInRight = root.right
                    let parentOfMinInRight = null
                    while (minInRight.left) {
                        parentOfMinInRight = minInRight
                        minInRight = minInRight.left
                    }

                    // minInRight的左子节点设为删除对象节点target的left
                    minInRight.left = root.left

                    // 当删除对象节点的右子树有左子树的时候
                    if (parentOfMinInRight) {
                        // parentOfMinInRight的左子节点(原minInRight)置为空
                        parentOfMinInRight.left = null

                        // minInRight的右子节点为空时，将其右子节点设为删除对象节点target的right
                        if (minInRight.right === null) {
                            minInRight.right = root.right
                        }
                        // minInRight的右子节点不为空时
                        else {
                            // 找到其右子树中的最大节点
                            let mininRightSubMax = minInRight.right
                            while (mininRightSubMax.right) {
                                mininRightSubMax = mininRightSubMax.right
                            }
                            // 将minInRight的右子树中的最大节点的right设为删除对象节点target的right
                            mininRightSubMax.right = root.right
                        }
                    }

                    // minInRight的父节点设为删除对象节点的父节点（在递归中返回 minInRight 即可）
                    subTree = minInRight
                }
                // 只有左子树
                else if (root.left != null) {
                    subTree = root.left
                }
                // 只有右子树
                else if (root.right != null) {
                    subTree = root.right
                }
                // 既没有左子树有没有右子树
                else {
                    // common process
                }
                root = null
                return subTree
            }
        }

        /**
         * 遍历前的参数检查方法
         *
         * @param {function} callback
         */
        this.__checkBeforeTraverse = function (callback) {
            if (!isFunction(callback)) throw new Error(`callback is not a function.`)
            if (!this.__root) throw new Error(`Traversing an empty tree.`)
        }

        /**
         * 中序遍历方法
         *
         * @param {TreeNode} root 节点
         * @param {function} callback 回调函数
         */
        this.__inOrderTraverseNode = function (root, callback) {
            if (!root) return

            this.__inOrderTraverseNode(root.left, callback)
            callback(root.data)
            this.__inOrderTraverseNode(root.right, callback)
        }

        /**
         * 前序遍历方法
         *
         * @param {TreeNode} root 节点
         * @param {function} callback 回调函数
         */
        this.__preOrderTraverse = function (root, callback) {
            if (!root) return

            callback(root.data)
            this.__preOrderTraverse(root.left, callback)
            this.__preOrderTraverse(root.right, callback)
        }

        /**
         * 后序遍历方法
         *
         * @param {TreeNode} root 节点
         * @param {function} callback 回调函数
         */
        this.__backOrderTraverse = function (root, callback) {
            if (!root) return

            this.__backOrderTraverse(root.left, callback)
            this.__backOrderTraverse(root.right, callback)
            callback(root.data)
        }

        /**
         * 根据指定 key 查找节点的方法
         *
         * @param {*} data data
         * @param {TreeNode} root 树的节点
         * @returns {TreeNode|undefined} 查找结果
         */
        this.__searchNode = function (data, root) {
            // key 值小，找左子树
            if (this.__comparator(data, root.data) === COMPARE_LESS) {
                if (root.left == null) {
                    return undefined
                }
                return this.__searchNode(key, root.left)
            }
            // key 值大，找右子树
            if (this.__comparator(data, root.data) === COMPARE_GREATER) {
                if (root.right == null) {
                    return undefined
                }
                return this.__searchNode(key, root.right)
            }
            // key === node.key
            else {
                return root
            }
        }
    }

    /**
     * 是否为空树
     *
     * @readonly
     * @memberof BinarySearchTree
     */
    get isEmpty() {
        return this.__root == null
    }

    /**
     * 获取最小节点的值
     *
     * @readonly
     * @memberof BinarySearchTree
     */
    get min() {
        if (this.isEmpty) return undefined

        let node = this.__root
        while (node.left) {
            node = node.left
        }

        return node.data
    }

    /**
     * 获取最大节点的值
     *
     * @readonly
     * @memberof BinarySearchTree
     */
    get max() {
        if (this.isEmpty) return undefined

        let node = this.__root
        while (node.right) {
            node = node.right
        }

        return node.data
    }

    /**
     * 插入节点
     *
     * @param {*} data data
     * @memberof BinarySearchTree
     */
    insert(data) {

        // 1.创建新节点
        let newNode = new TreeNode(data)

        // 2.插入新节点
        // this.__root = this.__insert(this.__root, newNode)        
        if (this.__root === null) {
            this.__root = newNode
        } else {
            this.__insertNode(this.__root, newNode)
        }
    }

    /**
     * 删除指定节点
     *
     * @param {*} data data
     * @returns {bool} 删除结果：true/false
     * @memberof BinarySearchTree
     */
    remove(data) {
        if (this.isEmpty) return false
        if (!this.has(data)) return false

        this.__root = this.__removeNode(data, this.__root)
        return true
    }

    /**
     * 中序遍历
     * left -> root -> right
     * 可形成升序排列
     * @param {function} callback 回调函数
     * @memberof BinarySearchTree
     */
    inOrderTraverse(callback) {
        this.__checkBeforeTraverse(callback)
        this.__inOrderTraverseNode(this.__root, callback)
    }

    /**
     * 前序遍历
     * root -> left -> right
     *
     * @param {function} callback 回调函数
     * @memberof BinarySearchTree
     */
    preOrderTraverse(callback) {
        this.__checkBeforeTraverse(callback)
        this.__preOrderTraverse(this.__root, callback)
    }

    /**
     * 后序遍历
     * left -> right -> root
     *
     * @param {function} callback 回调函数
     * @memberof BinarySearchTree
     */
    postOrderTraverse(callback) {
        this.__checkBeforeTraverse(callback)
        this.__backOrderTraverse(this.__root, callback)
    }

    /**
     * 是否有指定 key 的节点存在
     *
     * @param {*} data data
     * @returns {bool} 是否存在：true/false
     * @memberof BinarySearchTree
     */
    has(data) {
        if (this.isEmpty) return false
        let node = this.__searchNode(data, this.__root)
        return !!node
    }

    /**
     * 查找指定 key 的节点值
     *
     * @param {*} data data
     * @returns 节点值
     * @memberof BinarySearchTree
     */
    search(data) {
        if (this.isEmpty) return undefined
        let node = this.__searchNode(data, this.__root)
        return node.data
    }
}