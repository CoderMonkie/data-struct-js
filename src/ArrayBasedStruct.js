import {
    deepCopy
} from "./common/toollib"

/**
 * 基于数组实现的数据结构的基类
 *
 * @class ArrayBasedStruct
 */
class ArrayBasedStruct {
    constructor() {
        this.__items = []
    }

    /**
     * 获取所有元素
     *
     * @returns 元素集合
     * @memberof Stack
     */
    getItems() {
        return deepCopy(this.__items)
    }

    /**
     * 数据结构实例中是否包含元素
     *
     * @readonly
     * @memberof ArrayBasedStruct
     */
    get isEmpty() {
        return this.__items.length === 0
    }

    /**
     * 数据结构实例的元素个数
     *
     * @readonly
     * @memberof ArrayBasedStruct
     */
    get size() {
        return this.__items.length
    }

    /**
     * 清空数据结构中的元素
     *
     * @memberof ArrayBasedStruct
     */
    clear() {
        this.__items.length = 0
    }
}

export default ArrayBasedStruct