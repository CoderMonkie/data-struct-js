import { Queue } from './Queue'

/**
 * 优先级队列数据结构
 *
 * @export PriorityQueue
 * @class PriorityQueue
 * @extends {Queue}
 */
export class PriorityQueue extends Queue {
    constructor() {
        super()
    }

    /**
     * 加入队列
     *
     * @param {*} element 要加入队列的元素
     * @param {*} priority 要加入队列元素的优先级
     * @memberof PriorityQueue
     */
    enqueue(element, priority) {
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
     * @returns 字符串
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

        // toString 实例方法
        this.toString = function () {
            return this.__element.toString.apply(this.__element)
        }
        /**
         * 为什么要添加实例方法而不是只重写原型链方法？
         * 因为深拷贝时只针对自有属性/方法，不会复制原型链上的，
         * 这样，重写的方法，就不会在深拷贝中丢失。
         * 可以让原型链上的该方法同时也指向该实例方法。
         */
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
     *重写原型链上的 toString 方法
     *
     * @returns 字符串
     * @memberof QueueElement
     */
    toString() {
        // 原型链方法 toString = 实例方法 toString
        return this.toString()
    }
}