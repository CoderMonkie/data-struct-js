export const NODE_COLOR_RED = true
export const NODE_COLOR_BLACK = false

/**
 * 树的节点对象类
 * 内部用
 * @class TreeNode
 */
export class TreeNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.left = null
        this.right = null
        this.parent = null
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
    constructor(key, value, color = NODE_COLOR_RED) {
        super(key, value)
        this.__color = color
    }

    get isRed() {
        return this.__color
    }

    get isBlack() {
        return !this.__color
    }

    get isLeftChild() {
        return this.parent && this.parent.left === this
    }

    get isRightChild() {
        return this.parent && this.parent.right === this
    }

    get sibling() {
        return (this.isLeftChild
            ? this.parent.right
            : this.parent.left)
    }

}