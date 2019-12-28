import {
    eqComparer
} from '../common/toollib'
import {
    LinkedListNode,
    loopToFind,
} from './LinkedListNode'

/**
 * @description 链表
 * @author 码路工人 CoderMonkey
 * @export
 * @class LinkedList
 */
export class LinkedList {
    constructor() {
        this.clear()
    }

    /**
     * 链表元素个数
     *
     * @readonly
     * @memberof LinkedList
     */
    get size() {
        return this.__count
    }

    /**
     * 是否为空链表
     *
     * @readonly
     * @memberof LinkedList
     */
    get isEmpty() {
        return this.size === 0
    }

    /**
     * 获取链表的首元素数据
     * @deprecated since v0.05 change to use [head] instead
     * @readonly
     * @memberof LinkedList
     */
    get firstNode() {
        return this.findAt(0)
    }

    /**
     * 获取链表的首元素数据
     *
     * @readonly
     * @memberof LinkedList
     */
    get head() {
        return this.__head && this.__head.data
    }

    /**
     * 获取链表的尾元素数据
     * @deprecated since v0.05 change to use [tail] instead
     * @readonly
     * @memberof LinkedList
     */
    get lastNode() {
        return this.findAt(this.size - 1)
    }

    /**
     * 获取链表的尾元素数据
     *
     * @readonly
     * @memberof LinkedList
     */
    get tail() {
        return this.__tail && this.__tail.data
    }

    /**
     * 向链表末尾添加数据
     *
     * @param {*} data 链表元素的数据
     * @returns true
     * @memberof LinkedList
     */
    append(data) {
        // 1.创建新元素
        const newNode = new LinkedListNode(data)

        // 2.1链表为空时，直接添加到末尾
        if (this.isEmpty) {
            this.__head = newNode
            this.__tail = newNode
        }
        // 2.2链表非空时，末尾添加新元素
        else {
            this.__tail.next = newNode
            this.__tail = newNode
        }

        // 3.内部计数加1
        this.__count += 1

        return true
    }

    /**
     * 向链表指定位置插入元素
     *
     * @param {number} position 插入位置
     * @param {*} data
     * @returns 插入结果：true/false
     * @memberof LinkedList
     */
    insert(position, data) {
        // 1.边界检查（插入位置）
        if (position < 0 || position > this.__count) return false

        // 2.创建新元素
        var newNode = new LinkedListNode(data)

        // 3.1插入到链表头部
        if (position === 0) {
            newNode.next = this.__head
            this.__head = newNode

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
     * 删除链表指定位置元素
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
            // 2.2.2.使当前元素不再被引用
            previous.next = current.next

            // 2.2.3.删除尾元素的时候
            if (this.size - 1 === position) {
                // 更新 tail 的指针
                this.__tail = previous
            }
        }

        // 3.内部计数减1
        this.__count -= 1

        return true
    }

    /**
     * 更新链表指定位置的元素
     *
     * @param {number} position 位置下标
     * @param {*} data 新数据
     * @returns 更新结果：true/false
     * @memberof LinkedList
     */
    update(position, data) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return false

        // 2.找到指定位置元素
        const current = loopToFind(position, this.__head)

        // 3.修改当前元素数据
        current.data = data

        // 4.修改完成，返回 true
        return true
    }

    /**
     * 查看指定位置元素的数据
     *
     * @param {number} position 位置下标
     * @returns 元素数据
     * @memberof LinkedList
     */
    findAt(position) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return undefined

        // 2.找到指定位置元素
        const current = loopToFind(position, this.__head)

        // 3.返回该节点元素的数据部分
        return current.data
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
     * 遍历链表
     *
     * @param {function} callback
     * @memberof LinkedList
     */
    traverse(callback) {
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
     * 清空链表
     *
     * @memberof LinkedList
     */
    clear() {
        // 记录链表首尾
        this.__head = null
        this.__tail = null

        // 记录链表元素个数
        this.__count = 0
    }

    /**
     * 获取字符串
     *
     * @returns 链表的字符串
     * @memberof LinkedList
     */
    toString() {
        let str = '[HEAD] -> '
        let current = this.__head
        while (current) {
            str += current + ' -> '
            current = current.next
        }
        if (str === '[HEAD] -> ') {
            str = '[HEAD] -> Null'
        }
        str += `\r\nCount: ${this.size}`
        return str
    }
}