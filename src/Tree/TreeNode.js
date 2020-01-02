export const NODE_COLOR_RED = true
export const NODE_COLOR_BLACK = false

/**
 * 二叉树节点类
 * 内部用
 * @class TreeNode
 */
export class TreeNode {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
        this.parent = null

        this.toString = function () {
            return data.toString()
        }
    }
    
    get isLeftChild() {
        return this.parent && this.parent.left === this
    }

    get isRightChild() {
        return this.parent && this.parent.right === this
    }

    get sibling() {
        return (this.parent
            ? this.isLeftChild ? this.parent.right : this.parent.left
            : null)
    }
}

/**
 * 红黑树节点类
 *
 * @export
 * @class RBTreeNode
 * @extends {TreeNode}
 */
export class RBTreeNode extends TreeNode {
    constructor(data, color = NODE_COLOR_RED) {
        super(data)
        this.__color = color

        this.toString = function () {
            return `(${this.__color ? 'Red' : 'Black'})${this.data.toString()}`
        }
    }

    get isRed() {
        return this.__color
    }

    get isBlack() {
        return !this.__color
    }

    /**
     * @description 给节点设颜色（红/黑）
     * @param {NODE_COLOR_RED | NODE_COLOR_BLACK} color
     * @memberof RBTreeNode
     */
    color(color) {
        this.__color = color
    }
}