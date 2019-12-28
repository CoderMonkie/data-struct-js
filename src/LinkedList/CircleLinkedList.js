import {
    eqComparer,
    isFunction
} from '../common/toollib'
import {
    LinkedListNode,
} from './LinkedListNode'
import { LinkedList } from './LinkedList'

/**
 * @description 单向循环链表
 * @export CircleLinkedList
 * @class CircleLinkedList
 * @extends {LinkedList}
 */
export class CircleLinkedList extends LinkedList {
    constructor() {
        super()
    }

    /**
     * 向循环链表添加数据
     *
     * @param {*} data
     * @returns
     * @memberof CircleLinkedList
     */
    append(data) {
        // 1. 创建新元素
        let newNode = new LinkedListNode(data)

        // 2.1 链表为空时，直接添加到末尾
        if (this.isEmpty) {
            this.__head = newNode
            this.__tail = newNode
        }
        // 2.2 链表非空时，末尾添加新元素
        else {
            this.__tail.next = newNode
            this.__tail = newNode
        }
        // 2.3 将新的尾节点的后继指向头节点
        this.__tail.next = this.__head

        // 3. 内部计数加1
        this.__count += 1

        return true
    }

    /**
     * 向循环链表指定位置插入元素
     *
     * @param {number} position 插入位置
     * @param {*} data
     * @returns 插入结果：true/false
     * @memberof LinkedList
     */
    insert(position, data) {
        // 1. 边界检查（插入位置）
        if (position < 0 || position > this.__count) throw new Error('position out of range.')

        // 2. 创建新元素
        var newNode = new LinkedListNode(data)

        // 3.1插入到链表头部
        if (position === 0) {
            newNode.next = this.__head
            this.__head = newNode
            this.__tail.next = this.__head

            // 内部计数加1
            this.__count += 1
        }
        // 3.2插入到链表尾部
        else if (position === this.size) {
            this.append(data)
        }
        // 3.3以外
        else {
            let previous = null
            let current = this.__head
            let index = 0
            while (index < position) {
                previous = current
                current = current.next
                index++
            }
            previous.next = newNode
            newNode.next = current

            // 内部计数加1
            this.__count += 1
        }

        return true
    }

    /**
     * 删除链表中某个元素
     *
     * @param {*} data 元素数据
     * @param {function} [customizedComparer=null] 可选参数，指定比对方法
     * @returns 删除结果：true/false
     * @memberof LinkedList
     */
    remove(data, customizedComparer = null) {

        const position = this.indexOf(data, customizedComparer)

        if (position === -1) return false

        return this.removeAt(position)
    }

    /**
     * 删除循环链表指定位置元素
     *
     * @param {number} position 位置下标
     * @returns 删除结果：true/false
     * @memberof LinkedList
     */
    removeAt(position) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return false

        // 2.1.链表中只要一个元素的时候
        if (this.size === 1) {
            // position 只能是 0
            this.__head = this.__tail = null
        }
        // 2.2.链表中有多个元素的时候
        else {
            let index = 0
            let previous = null
            let current = this.__head

            // 2.2.1.找到指定位置元素
            while (index++ < position) {
                previous = current
                current = current.next
            }
            // 2.2.2.使当前元素不再被引用(当删除的不是头节点)
            previous && (previous.next = current.next)

            // A. 如果删除的是头节点
            if (position === 0) {
                // 更新 head 的指针
                this.__head = current.next
                // 重新连接首尾
                this.__tail.next = this.__head
            }
            // B. 如果删除的是尾节点
            else if (position === this.size - 1) {
                // 更新 tail 的指针
                this.__tail = previous
            }
        }

        // 3.内部计数减1
        this.__count -= 1

        return true
    }

    /**
     * 根据指定元素数据获取在链表中的位置下标
     *
     * @param {*} data 元素数据
     * @param {function|null} customizedComparer 指定的比对方法
     * @returns 位置下标
     * @memberof LinkedList
     */
    indexOf(data, customizedComparer) {
        let index = 0
        let current = this.__head
        const comparerFunc = eqComparer(customizedComparer)

        // 根据指点数据查找节点元素，探查到尾节点后需停止
        while (index < this.size) {
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
     * 遍历链表
     *
     * @param {function} callback
     * @memberof LinkedList
     */
    traverse(callback) {
        // 参数检查（回调函数）
        if (!callback || !isFunction(callback)) return

        // 计数
        let index = 0
        // 起始元素设为 head
        let current = this.__head

        // 头部起始，向后遍历，到链表尾结束
        while (index < this.size) {
            callback(current.data)
            current = current.next
            index += 1
        }
    }

    /**
     * 迭代下一个节点
     * 即链表头节点指针后移
     *
     * @returns 所在节点数据
     * @memberof CircleLinkedList
     */
    getNext() {
        if (this.isEmpty) return undefined
        let current = this.__head
        if (this.size > 1) {
            this.__head = current.next
            this.__tail = current
        }
        return current.data
    }

    /**
     * 获取字符串
     *
     * @returns 循环链表的字符串
     * @memberof LinkedList
     */
    toString() {
        let str = '[ '
        let index = 0
        let current = this.__head
        while (index < this.size) {
            str += current + ' -> '
            current = current.next
            index += 1
        }
        str += ` | Count: ${this.size} ]`
        return str
    }
}