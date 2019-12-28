import {
    deepCopy,
    isFunction
} from './common/toollib'
import ArrayBasedStruct from './ArrayBasedStruct'

/**
 * 栈结构
 *
 * @export
 * @class Stack
 * @extends {ArrayBasedStruct}
 */
export class Stack extends ArrayBasedStruct {
    constructor() {
        super()
    }

    /**
     * 将新元素入栈
     *
     * @param {*} element
     * @memberof Stack
     */
    push(element) {
        return this.__items.push(element)
    }

    /**
     * 栈顶元素出栈
     *
     * @returns 栈顶元素
     * @memberof Stack
     */
    pop() {
        return this.__items.pop()
    }

    /**
     * 查看栈顶元素
     *
     * @returns 栈顶元素
     * @memberof Stack
     */
    peek() {
        if (!this.__items.length) return undefined
        return deepCopy(this.__items[this.__items.length - 1])
    }

    /**
     *遍历栈结构
     *
     * @param {function} callback
     * @param {boolean} [reversal=false]
     * @memberof Stack
     */
    traverse(callback, reversal = false) {
        // 检查回调函数
        if (!isFunction(callback)) return

        var items = this.getItems(this.__items)
        var from = reversal ? items.length - 1 : 0
        var to = reversal ? 0 : items.length - 1
        // 循环条件
        var loopCondition = function (current) {
            if (reversal) {
                return current >= to
            } else {
                return current <= to
            }
        }
        // 游标前进
        var stepIn = function (current) {
            if (reversal) {
                return current - 1
            } else {
                return current + 1
            }
        }

        // 进行遍历
        for (var index = from; loopCondition(index); index = stepIn(index)) {
            var element = items[index];
            callback(element, index)
        }
    }

    /**
     * 转为字符串
     *
     * @returns
     * @memberof Stack
     */
    toString() {
        return this.__items.map(element => element.toString()).join(' ')
    }
}