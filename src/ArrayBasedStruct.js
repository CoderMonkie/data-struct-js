/**
 *基于数组实现的数据结构的基类
 *
 * @class ArrayBasedStruct
 */
class ArrayBasedStruct {
    constructor() {
        this._items = []
    }

    /**
     *数据结构实例中是否包含元素
     *
     * @readonly
     * @memberof ArrayBasedStruct
     */
    get isEmpty() {
        return this._items.length === 0
    }

    /**
     *数据结构实例的元素个数
     *
     * @readonly
     * @memberof ArrayBasedStruct
     */
    get size() {
        return this._items.length
    }

    /**
     *清空数据结构中的元素
     *
     * @memberof ArrayBasedStruct
     */
    clear() {
        this._items.length = 0
    }
}

export default ArrayBasedStruct