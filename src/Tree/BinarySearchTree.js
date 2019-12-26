import {
    isFunction
} from "../common/toollib"

export default class BinarySearchTree {
    constructor() {
        this.__root = null

        /**
         * 插入节点方法
         * @deprecated
         * @param {TreeNode|null} root 根节点
         * @param {TreeNode} newNode 新节点
         * @returns 插入结果 TreeNode
         */
        this.__insert = function (root, newNode) {

            // 1.如果为空节点，则作直接链接该节点
            if (root === null) {
                return newNode
            }
            // 2.如果 key 相同，则更新该节点的值
            else if (root.key === newNode.key) {
                root.value = newNode.value
            }
            // 3.否则找到合适位置插入
            else {
                // 3.1.新节点 key 值小，找左子树插入
                if (root.key > newNode.key) {
                    root.left = this.__insert(root.left, newNode)
                }
                // 3.2.新节点 key 值大，找右子树插入
                else {
                    root.right = this.__insert(root.right, newNode)
                }
            }

            // 4.返回插入结果
            return root
        }

        /**
         * 插入节点方法
         * 
         * @param {TreeNode} root 根节点
         * @param {TreeNode} newNode 新节点
         */
        this.__insertNode = function (root, newNode) {
            // 1.若 key 相等，则更新该节点的值
            if (root.key === newNode.key) {
                root.value = newNode.value
                return
            }
            // 2.若新节点 key 值小，找左子树插入
            else if (root.key > newNode.key) {
                if (root.left === null) {
                    root.left = newNode
                } else {
                    this.__insertNode(root.left, newNode)
                }
            }
            // 3.若新节点 key 值大，找右子树插入
            else {
                if (root.right === null) {
                    root.right = newNode
                } else {
                    this.__insertNode(root.right, newNode)
                }
            }
        }

        /**
         * 删除节点方法
         * 
         * @param {*} key key
         * @param {TreeNode} node 节点
         * @returns {TreeNode|null} 删除指定节点后的(子)树
         */
        this.__removeNode = function (key, node) {
            if (node == null) return null

            if (key < node.key) {
                node.left = this.__removeNode(key, node.left)
                return node
            }
            // 
            else if (key > node.key) {
                node.right = this.__removeNode(key, node.right)
                return node
            }
            //
            else {
                let subTree = null

                // 要删除的节点同时包含左右子树
                if (node.left != null && node.right != null) {

                    // 找到右子树里最小的节点minInRight，替代删除对象节点target
                    let minInRight = node.right
                    let parentOfMinInRight = null
                    while (minInRight.left) {
                        parentOfMinInRight = minInRight
                        minInRight = minInRight.left
                    }

                    // minInRight的左子节点设为删除对象节点target的left
                    minInRight.left = node.left

                    // minInRight的右子节点不为空时，
                    // 将minInRight.right的右子节点设为删除对象节点的右子节点
                    if (minInRight.right) {
                        minInRight.right.right = node.right
                    }
                    // minInRight的右子节点为空时，将其右子节点设为parentOfMinInRight
                    else {
                        minInRight.right = parentOfMinInRight
                    }

                    // parentOfMinInRight的左子节点(原minInRight)置为空
                    if (parentOfMinInRight) {
                        parentOfMinInRight.left = null
                    }

                    // minInRight的父节点设为删除对象节点的父节点（在递归中返回 minInRight 即可）
                    subTree = minInRight
                }
                // 只有左子树
                else if (node.left != null) {
                    subTree = node.left
                }
                // 只有右子树
                else if (node.right != null) {
                    subTree = node.right
                }
                // 既没有左子树有没有右子树
                else {
                    // common process
                }
                node = null
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
            callback(root.value)
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

            callback(root.value)
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
            callback(root.value)
        }

        /**
         * 根据指定 key 查找节点的方法
         *
         * @param {*} key key
         * @param {TreeNode} node 树的节点
         * @returns {TreeNode|undefined} 查找结果
         */
        this.__searchNode = function (key, node) {
            // key 值小，找左子树
            if (key < node.key) {
                if (node.left == null) {
                    return undefined
                }
                return this.__searchNode(key, node.left)
            }
            // key 值大，找右子树
            else if (key > node.key) {
                if (node.right == null) {
                    return undefined
                }
                return this.__searchNode(key, node.right)
            }
            // key === node.key
            else {
                return node
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

        return node.value
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

        return node.value
    }

    /**
     * 插入节点
     *
     * @param {*} key key
     * @param {*} value value
     * @memberof BinarySearchTree
     */
    insert(key, value) {

        // 1.创建新节点
        const newNode = new TreeNode(key, value)

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
     * @param {*} key key
     * @returns {bool} 删除结果：true/false
     * @memberof BinarySearchTree
     */
    remove(key) {
        if (this.isEmpty) return false
        if (!this.has(key)) return false

        this.__root = this.__removeNode(key, this.__root)
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
    backOrderTraverse(callback) {
        this.__checkBeforeTraverse(callback)
        this.__backOrderTraverse(this.__root, callback)
    }

    /**
     * 是否有指定 key 的节点存在
     *
     * @param {*} key key
     * @returns {bool} 是否存在：true/false
     * @memberof BinarySearchTree
     */
    has(key) {
        if (this.isEmpty) return false
        let node = this.__searchNode(key, this.__root)
        return !!node
    }

    /**
     * 查找指定 key 的节点值
     *
     * @param {*} key key
     * @returns 节点值
     * @memberof BinarySearchTree
     */
    search(key) {
        if (this.isEmpty) return undefined
        let node = this.__searchNode(key, this.__root)
        return node.value
    }
}

/**
 * 树的节点对象类
 * 内部用
 * @class TreeNode
 */
class TreeNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.left = null
        this.right = null
    }
}