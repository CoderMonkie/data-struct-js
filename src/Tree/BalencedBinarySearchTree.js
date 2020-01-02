import {
    BinarySearchTree
} from "./BinarySearchTree";

/**
 * 平衡二叉搜索树
 *
 * @export
 * @class BalencedBinarySearchTree
 * @extends {BinarySearchTree}
 */
export class BalencedBinarySearchTree extends BinarySearchTree {
    constructor(customizedComparer) {
        super(customizedComparer)
    }

    /**
     * 左旋
     * 
     *   ◎r
     *    \
     *     〇c
     * ↓---------
     *     〇c
     *   　/
     *   ◎r
     * 
     * @param {TreeNode} r 旋转的节点 ◎
     * @param {TreeNode} c 圆心节点 〇
     * @memberof BalencedBinarySearchTree
     */
    rotateLeft(r, c) {
        let grand = r.parent

        // 1. grand 层
        if (r.isLeftChild) {
            grand.left = c
        } else if (r.isRightChild) {
            grand.right = c
        }

        // 2. 旋转层
        r.right = c.left
        r.parent = c

        // 3. 圆心层
        c.parent = grand
        c.left = r
    }

    /**
     * 右旋
     * 
     *      ◎r
     *     /
     *    〇c
     * --------↓
     *    〇c
     *   　\
     *      ◎r
     * 
     * @param {TreeNode} r 旋转的节点 ◎
     * @param {TreeNode} c 圆心节点 〇
     * @memberof BalencedBinarySearchTree
     */
    rotateRight(r, c) {
        let grand = r.parent

        // 1. grand 层
        if (r.isLeftChild) {
            grand.left = c
        } else if (r.isRightChild) {
            grand.right = c
        }

        // 2. 旋转层
        r.left = c.right
        r.parent = c

        // 3. 圆心层
        c.parent = grand
        c.right = r
    }
}