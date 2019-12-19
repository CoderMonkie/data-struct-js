import Queue from './Queue'

/**
 *优先级队列数据结构
 *
 * @export
 * @class PriorityQueue
 * @extends {Queue}
 */
export default class PriorityQueue extends Queue {
    constructor() {
        super()
    }

    /**
     *加入队列
     *
     * @param {*} element 要加入队列的元素
     * @param {*} priority 要加入队列元素的优先级
     * @memberof PriorityQueue
     */
    enque(element, priority) {
        const queueElement = new QueueElement(element, priority)

        // 空队列的时候直接入队
        if (this.isEmpty) {
            this.__items.push(queueElement)
        }
        // 非空的时候需进行优先级比较
        else {
            let added = false
            for (let i = 0; i < this.size; i++) {
                if (queueElement.priority < this.__items[i].priority) {
                    this.__items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if (!added) {
                this.__items.push(queueElement)
            }
        }
    }

    /**
     *重写 toString 方法
     *
     * @returns
     * @memberof PriorityQueue
     */
    toString() {
        const arrStr = this.__items.map((qe) => {
            return qe.toString()
        })
        return arrStr.join(' ')
    }
}

/**
 *优先级队列元素
 *
 * @class QueueElement
 */
class QueueElement {

    /**
     *Creates an instance of QueueElement.
     * @param {*} element 元素
     * @param {number} priority 元素优先级
     * @memberof QueueElement
     */
    constructor(element, priority = Infinity) {
        // check priority
        if (typeof (priority) != 'number' || Number.isNaN(priority)) {
            // min-level: Infinity
            priority = Infinity
        }
        this.__element = element
        // max-level: 0
        this.__priority = priority
    }

    /**
     *优先级
     *
     * @readonly
     * @memberof QueueElement
     */
    get priority() {
        return this.__priority
    }

    /**
     *重写 toString 方法
     *
     * @returns
     * @memberof QueueElement
     */
    toString() {
        return this.__element.toString.apply(this.__element)
    }
}