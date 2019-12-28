import { LinkedList } from './LinkedList'
import {
    isFunction,
    eqComparer
} from '../common/toollib'
import {
    LinkedListNode,
    loopToFind,
    needReversal,
    doublyFindAt,
} from './LinkedListNode'

/**
 * 双向链表
 *
 * @export DoublyLinkedList
 * @class DoublyLinkedList
 * @extends {LinkedList}
 */
export class DoublyLinkedList extends LinkedList {
    constructor() {
        super()
    }

    /**
     * 向链表末尾添加数据
     *
     * @param {*} data 链表元素的数据
     * @returns true
     * @memberof DoublyLinkedList
     */
    append(data) {
        let newNode = new LinkedListNode(data)

        // 1.判断链表是否为空
        if (this.isEmpty) {
            // 新元素既是首也是尾
            this.__head = newNode
            this.__tail = newNode
        }
        // 2.非空链表时，添加到尾部
        else {
            this.__tail.next = newNode
            newNode.prev = this.__tail
            this.__tail = newNode
        }

        // 3.计数加1
        this.__count += 1

        return true
    }

    /**
     * 向链表指定位置插入元素
     *
     * @param {number} position 插入位置
     * @param {*} data
     * @returns 插入结果：true/false
     * @memberof DoublyLinkedList
     */
    insert(position, data) {
        // 1.边界检查（插入位置）
        if (position < 0 || position > this.__count) return false

        let newNode = new LinkedListNode(data)

        // 2.插入元素时链表为空
        if (this.isEmpty) {
            this.__head = newNode
            this.__tail = newNode
        }
        // 3.链表非空
        else {
            // 3.1插入到链表头部
            if (position === 0) {
                newNode.next = this.__head
                this.__head.prev = newNode
                this.__head = newNode
            }
            // 3.2插入到链表尾部
            else if (position === this.__count) {
                this.__tail.next = newNode
                newNode.prev = this.__tail
                this.__tail = newNode
            }
            // 3.3以外
            else {
                let current = doublyFindAt(this.size, position, this.__head, this.__tail)
                current.prev.next = newNode
                newNode.prev = current.prev
                newNode.next = current
                current.prev = newNode
            }
        }

        // 4.计数加1
        this.__count += 1

        return true
    }

    /**
     * 删除链表指定位置元素
     *
     * @param {number} position 位置下标
     * @returns 删除结果：true/false
     * @memberof DoublyLinkedList
     */
    removeAt(position) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return false

        // 2.只有一个元素
        if (this.size === 1) {
            this.__head = null
            this.__tail = null
        }
        // 3.多个元素的情况
        else {
            // 3.1 删首
            if (position === 0) {
                this.__head = current.next
                current.next.prev = null
            }
            // 3.2 删尾
            else if (position === this.__count - 1) {
                this.__tail = this.__tail.prev
                this.__tail.next = null
            }
            // 3.3 以外
            else {
                let current = doublyFindAt(this.size, position, this.__head, this.__tail)
                current.prev.next = current.next
                current.next.prev = current.prev
            }
        }

        // 4.计数减1
        this.__count -= 1

        return true
    }

    /**
     * 删除指定数据的元素
     *
     * @param {*} data 元素数据
     * @param {*} customizedComparer 自定义比对方法
     * @returns 返回删除的元素数据
     * @memberof DoublyLinkedList
     */
    remove(data, customizedComparer) {
        // 1.根据指定数据取得下标值
        let index = this.indexOf(data, customizedComparer)

        // 2.检查下标值是否正常取到
        if (index === -1) return false

        // 3.根据取到的下标，调用 removeAt 方法进行删除
        return this.removeAt(index)
    }

    /**
     * 更新指定位置元素
     *
     * @param {number} position 位置下标
     * @param {*} data 更新的数据
     * @returns 更新结果：成功true/失败false
     * @memberof DoublyLinkedList
     */
    update(position, data) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return false

        // 2.找到指定下标位置元素（根据所处位置从头或从尾查找）
        let targetNode = doublyFindAt(this.size, position, this.__head, this.__tail)

        // 3.修改数据
        targetNode.data = data

        return true
    }

    /**
     * 获取指定位置元素的数据
     *
     * @param {number} position 位置下标
     * @returns 元素的数据
     * @memberof DoublyLinkedList
     */
    findAt(position) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return undefined

        // 2.判断该位置处于链表前半部分还是后半部分
        //   前半部分的时候，从 head 开始查找
        //   后半部分的时候，从 tail 开始查找
        const reversal = needReversal(this.size, position)

        // 3.找到指定位置元素
        const current = reversal ?
            loopToFind(position, this.__tail, this.size - 1) :
            loopToFind(position, this.__head, null)

        // 4.返回该节点元素的数据部分
        return current.data
    }

    /**
     * 根据指定元素数据获取在链表中的位置下标
     *
     * @param {*} data
     * @returns 位置下标
     * @memberof DoublyLinkedList
     */
    indexOf(data, customizedComparer) {
        let index = 0
        let current = this.__head
        const comparerFunc = eqComparer(customizedComparer)

        // 根据指点数据查找节点元素
        while (current) {
            if (comparerFunc(current.data, data)) {
                return index
            }
            current = current.next
            index += 1
        }

        // 没有找到符合的节点元素
        return -1
    }

    /**
     * 从尾元素开始遍历
     *
     * @param {function} callback
     * @memberof DoublyLinkedList
     */
    backwardTraverse(callback) {
        // 参数检查（回调函数）
        if (!callback || !isFunction(callback)) return

        // 起始元素设为 tail
        let current = this.__tail

        // 尾部起始，向前遍历
        while (current) {
            callback(current.data)
            current = current.prev
        }
    }

    /**
     * 从首元素开始遍历
     *
     * @param {function} callback
     * @memberof DoublyLinkedList
     */
    forwardTraverse(callback) {
        // 参数检查（回调函数）
        if (!callback || !isFunction(callback)) return

        // 起始元素设为 head
        let current = this.__head

        // 头部起始，向后遍历
        while (current) {
            callback(current.data)
            current = current.next
        }
    }

    /**
     * 根据指定顺序，遍历双向链表
     *默认为 forwardTravase
     * @param {function} callback
     * @param {boolean} [reversal=false]
     * @memberof DoublyLinkedList
     */
    traverse(callback, reversal = false) {
        reversal
            ?
            this.backwardTraverse(callback) :
            this.forwardTraverse(callback)
    }
}