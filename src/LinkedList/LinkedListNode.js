/**
 * 链表数据结构内部用元素节点类
 * 注意：不应被 return 到外部
 *
 * @class Node
 */
class LinkedListNode {
    constructor(data, next = null, prev = null) {
        this.data = data
        this.next = next
        this.prev = prev

        this.toString = function () {
            return this.data.toString.apply(this.data)
        }
    }

    toString() {
        return this.toString()
    }
}

/**
 * 链表内部用查找方法
 *
 * @param {number} position 位置下标
 * @param {LinkedListNode} node 查找起始的元素节点
 * @param {number} [lastIndex=0] 可选参数：链表末尾元素的下标
 * @returns 指点位置的元素节点
 */
const loopToFind = function (position, node, lastIndex = 0) {
    let index = lastIndex || 0

    // 根据参数[lastIndex]选择从头查找还是从尾查找
    if (lastIndex) {
        // seek from tail
        while (index-- > position) {
            node = node.prev
        }
    } else {
        // seek from head
        while (index++ < position) {
            node = node.next
        }
    }

    return node
}

/**
 * 检查指定的位置是否处于链表的后半部分
 * 以改变查找的顺序
 * @param {number} size 链表元素总个数
 * @param {number} position 指定的位置
 * @returns true:从末尾开始查找 false:从头部开始查找
 */
const needReversal = function (size, position) {
    const middle = Math.floor(size / 2)
    return middle < position
}

/**
 * 根据指定位置下标查找链表内元素
 * 当指定位置处于链表后半部分时，
 * 从尾部开始遍历查找，
 * 否则从头部开始
 * @param {number} size 链表容量
 * @param {number} position 位置下标
 * @param {LinkedListNode} head 首位元素
 * @param {LinkedListNode} tail 末尾元素
 * @returns 链表节点元素
 */
const doublyFindAt = function (size, position, head, tail) {
    // 1.根据所在位置判断是否从末尾开始查找
    const reversal = needReversal(size, position)

    // 2.找到指定下标位置元素
    return (reversal ?
        loopToFind(position, tail, size - 1) :
        loopToFind(position, head))
}

export {
    LinkedListNode,
    loopToFind,
    needReversal,
    doublyFindAt,
}