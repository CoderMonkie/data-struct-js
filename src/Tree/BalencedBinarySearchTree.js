import {
    BinarySearchTree
} from "./BinarySearchTree";

export const ROTATE_LEFT = false
export const ROTATE_RIGHT = true

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
     * 旋转
     *
     * @param {TreeNode} n 旋转的节点 ◎
     * @param {ROTATE_LEFT | ROTATE_RIGHT} [direction=ROTATE_LEFT]
     * @memberof BalencedBinarySearchTree
     */
    rotate(n, direction = ROTATE_LEFT) {
        if(direction === ROTATE_LEFT) {
            this.rotateLeft(n)
        }
        else {
            this.rotateRight(n)
        }
    }

    /**
     * 左旋
     * 
     *   ◎n
     *    \
     *     〇c
     * ↓---------
     *     〇c
     *   　/
     *   ◎n
     * 
     * @param {TreeNode} n 旋转的节点 ◎
     * @memberof BalencedBinarySearchTree
     */
    rotateLeft(n) {
        // 1. grand 层
        if (n.isLeftChild) {
            n.parent.left = n.right
        } else if (n.isRightChild) {
            n.parent.right = n.right
        }
        n.right.parent = n.parent

        // 2. 旋转层
        n.parent = n.right
        n.right = n.right.left
        n.right && (n.right.parent = n)
        n.parent.left = n
    }

    /**
     * 右旋
     * 
     *      ◎n
     *     /
     *    〇c
     * --------↓
     *    〇c
     *   　\
     *      ◎n
     * 
     * @param {TreeNode} n 旋转的节点 ◎
     * @memberof BalencedBinarySearchTree
     */
    rotateRight(n) {
        // 1. grand 层
        if (n.isLeftChild) {
            n.parent.left = n.left
        } else if (n.isRightChild) {
            n.parent.right = n.left
        }
        n.left.parent = n.parent

        // 2. 旋转层        
        n.parent = n.left
        n.left = n.left.right
        n.left && (n.left.parent = n)
        n.parent.right = n
    }
}