import ArrayBasedStruct from "../ArrayBasedStruct"
import {
    deepCopy,
    isFunction
} from "../common/toollib"

/**
 * 队列结构
 *
 * @export Queue
 * @class Queue
 * @extends {ArrayBasedStruct}
 */
export class Queue extends ArrayBasedStruct {
    constructor() {
        super()
    }

    /**
     * 加入队列
     *
     * @param {*} element
     * @returns
     * @memberof Queue
     */
    enqueue(element) {
        return this.__items.push(element)
    }

    /**
     * 移出队列
     *
     * @returns
     * @memberof Queue
     */
    dequeue() {
        return this.__items.shift()
    }

    /**
     * 查看队列首
     *
     * @returns
     * @memberof Queue
     */
    front() {
        if (this.isEmpty) return undefined
        return deepCopy(this.__items[0])
    }

    /**
     * 遍历队列
     *
     * @memberof Queue
     */
    traverse(callback) {
        // 检查回调函数
        if (!isFunction(callback)) return

        // 获取队列全部元素的数组的拷贝
        var items = this.getItems(this.__items)

        for (let index = 0; index < this.size; index++) {
            const element = items[index];
            callback(element, index)
        }
    }
}