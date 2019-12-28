import {
    getNextPrime
} from '../common/toollib'

const MIN_LIMIT = 11

/**
 * 哈希表
 *
 * @export
 * @class HashTable
 */
export class HashTable {
    constructor() {
        this.__storage = []
        this.clear()

        this.toString = function () {
            let str = ''
            this.__storage.forEach(bucket => {
                if (!bucket) return
                str += bucket && bucket.map(tuple => {
                    return `${tuple[0]}:\r\n  {${tuple[1]}}`
                })
                str += '\r\n'
            });
            return str
        }
    }

    /**
     * 哈希表中元素的个数
     *
     * @readonly
     * @memberof HashTable
     */
    get size() {
        return this.__count
    }

    /**
     * 是否为空哈希表
     *
     * @readonly
     * @memberof HashTable
     */
    get isEmpty() {
        return this.__count === 0
    }

    /**
     * 清空哈希表
     *
     * @memberof HashTable
     */
    clear() {
        this.__storage.length = 0
        this.__count = 0
        this.__limit = MIN_LIMIT
    }

    /**
     * 向哈希表中填入输入（新增或修改）
     * 当新增时自动按需扩容
     * @param {*} key 键值
     * @param {*} value 数据值
     * @returns 当前元素个数
     * @memberof HashTable
     */
    put(key, value) {
        // key 检查：必须有值，且不能全是空格
        if (!key || !key.toString().trim()) {
            throw new Error('Paramater [key] must be set to a non-empty value.')
        }

        // 通过哈希函数获取下标
        const index = HashTable.hornerHashing(key, this.__limit)

        // 获取该 HashCode 对应的拉链数组
        // (对于下面的线性探查，这里用了数组，也可以使用链表，性能相当)
        let bucket = this.__storage[index]
        // 不存在则创建
        if (bucket == null) {
            this.__storage[index] = bucket = []
        }

        // [编辑模式]遍历拉链上的数据元素
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i];
            // 如果该 key 已存在
            if (tuple[0] === key) {
                // 更新数据
                tuple[1] = value

                return this.size
            }
        }

        // [新建模式]该 HashCode 对应的数据不存在，新增
        bucket.push([key, value])

        // 只有在新增数据的情况下计数加 1
        this.__count += 1

        // 占用超过 75% 时进行扩容
        if (this.__count > this.__limit * 0.75) {
            // 扩大一倍
            let newLimit = this.__limit * 2
            // 获取质数
            newLimit = getNextPrime(newLimit)
            // 进行扩容
            this.resize(newLimit)
        }

        return this.size
    }

    /**
     * 删除哈希表元素
     *
     * @param {*} key 键值
     * @returns 删除结果：true/false
     * @memberof HashTable
     */
    delete(key) {

        // 通过哈希函数获取下标
        const index = HashTable.hornerHashing(key, this.__limit)

        // 获取拉链(数组)
        let bucket = this.__storage[index]

        // 不存在该 key 的值
        if (!bucket) {
            return false
        }

        // 删除拉链上的值
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] === key) {
                // 删除数组元素
                bucket.splice(i, 1)

                // 删除成功的时候计数减 1
                this.__count -= 1

                // 该 HashCode 对应的值一个也没有的时候，
                // 将该拉链数组也置为空
                if (bucket.length === 0) {
                    this.__storage[index] = undefined
                }

                // 当容量大于最小限定(本处为 MIN_LIMIT=11)，且
                // 实际元素个数小于容量的 25% 时进行缩容
                if (this.__limit > MIN_LIMIT &&
                    this.__count < this.__limit * 0.25) {
                    // 缩小一半
                    let newLimit = Math.floor(this.__limit / 2)
                    // 获取质数
                    newLimit = getNextPrime(newLimit)
                    // 实施缩容
                    this.resize(newLimit)
                }

                return true
            }
        }

        // 拉链上也不存在
        return false
    }

    /**
     * 根据指定键值获取哈希表中对应元素的数据
     *
     * @param {*} key 键值
     * @returns Value
     * @memberof HashTable
     */
    get(key) {
        // 通过哈希函数获取下标
        const index = HashTable.hornerHashing(key, this.__limit)

        // 拉链地址
        const bucket = this.__storage[index]

        // 如果该 key 有对应的值
        if (bucket) {
            for (let i = 0; i < bucket.length; i++) {
                const tuple = bucket[i];
                // 查找拉链上的值
                if (tuple[0] === key) {
                    return tuple[1]
                }
            }
        }
        // 没有该 key 对应的值（没有拉链或）
        return undefined
    }

    /**
     * 变更容量（扩容或缩容）
     *
     * @param {number} newLimit 容量
     * @memberof HashTable
     */
    resize(newLimit) {
        // 1. 保存旧数据
        let oldStorage = this.__storage

        // 2. 重置当前哈希表 & [重置新容量]
        this.__storage = []
        this.__count = 0
        this.__limit = newLimit

        // 3. 恢复旧数据
        for (let i = 0; i < oldStorage.length; i++) {
            const bucket = oldStorage[i];

            if (!bucket) continue

            for (let j = 0; j < bucket.length; j++) {
                const tuple = bucket[j];
                this.put(tuple[0], tuple[1])
            }
        }
        // console.log(`Triggered! resize to ${newLimit}`)
    }

    /**
     * 哈希函数：
     *   根据多项式求值的霍纳法则计算下标值
     *
     * @static
     * @param {*} str 键值的字符串
     * @param {*} size 容量
     * @returns 计算出的数组下标
     * @memberof HashTable
     */
    static hornerHashing(str, size) {
        let hashCode = 0

        // 霍纳算法
        for (let i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
        return hashCode % size
    }
}