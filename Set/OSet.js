/**
 * ES6 中 JavaScript 提供了 Set 类
 * 这里基于 Object 封装一个 OSet 类
 * 避免重名
 */
function OSet () {

    this._items = {}

    OSet.prototype.add = function (value) {
        // 如果已存在，则不能添加元素，返回false
        if (this.has(value)) return false

        // 添加集合元素，即键值相同的键值对
        this._items[value] = value
        return true
    }
    
    OSet.prototype.delete = function (value) {
        // 判断是否存在，不存在则返回false
        if (!this.has(value)) return false

        // 删除集合元素，即删除对象属性
        delete this._items[value]
        return true
    }
    
    OSet.prototype.has = function (value) {
        return this._items.hasOwnProperty(value)
    }
    
    OSet.prototype.values = function () {
        return Object.keys(this._items)
    }
    
    OSet.prototype.clear = function () {
        this._items = {}
    }
    
    OSet.prototype.size = function () {
        return Object.keys(this._items).length
    }

    // ------------------------------
    // 集合间操作

    // 1.交集
    OSet.prototype.intersect = function (targetSet) {
        var intersection = new OSet()
        var values = this.values()
        for (var val of values) {
            if (targetSet.has(val)) {
                intersection.add(val)
            }
        }
        return intersection
    }

    // 2.并集
    OSet.prototype.unite = function (targetSet) {
        var union = new OSet()
        for (var val of this.values()) {
            union.add(val)
        }
        for (var val of targetSet.values()) {
            if (!union.has(val)) {
                union.add(val)
            }
        }
        return union
    }

    // 3.差集 differing
    OSet.prototype.differing = function (targetSet) {
        var difference = new OSet()
        for (var val of this.values()) {
            if (!targetSet.has(val)) {
                difference.add(val)
            }
        }
        return difference
    }
    
    // 4.补集 complement
    OSet.prototype.complement = function (targetSet) {
        var complement = new OSet()
        for (var val of targetSet.values()) {
            if (!this.has(val)) {
                complement.add(val)
            }
        }
        return complement
    }

    // 5.子集 isSubsetOf/subsetting
    // 判断 A 是 B 的子集吗
    OSet.prototype.isSubsetOf = function (targetSet) {
        var values = this.values()
        for (var i = 0; i < values.length; i++) {
            var item = values[i];
            if (!targetSet.has(item)) {
                return false
            }
        }
        return true
    }
    // 判断 B 是 A 的子集吗
    OSet.prototype.subsetting = function (targetSet) {
        var values = targetSet.values()
        for (var i = 0; i < values.length; i++) {
            var item = values[i];
            if (!this.has(item)) {
                return false
            }
        }
        return true
    }
}

// ---------------------------------------------
// Test: OSet
// ---------------------------------------------
console.log('----Test: OSet----')

var fruits = new OSet()
fruits.add('apple')
fruits.add('banana')
fruits.add('cherry')
fruits.add('tomato')
console.log('fruits: ', fruits.values())
console.log('Is cherry in fruits ? -> ', fruits.has('cherry'))
console.log('Is strawberry in fruits ? -> ', fruits.has('strawberry'))
fruits.delete('apple')
console.log('fruits after delete apple: ', fruits.values())
fruits.clear()
console.log('fruits after clear all: ', fruits.values())

var fruits = new OSet()
fruits.add('apple')
fruits.add('banana')
fruits.add('cherry')
fruits.add('tomato')
var vegetables = new OSet()
vegetables.add('cabbage')
vegetables.add('potato')
vegetables.add('tomato')

console.log('intersection of fruits and vegetables: ', fruits.intersect(vegetables).values())
console.log('union of fruits and vegetables: ', fruits.unite(vegetables).values())
console.log('fruits is different from vegetables: ', fruits.differing(vegetables).values())
console.log('fruits is complementary with vegetables: ', fruits.complement(vegetables).values())
console.log('is vegetables subset of fruits ? -> ', vegetables.isSubsetOf(fruits))
console.log('delete cabbage in vegetables -> ', vegetables.delete('cabbage'))
console.log('delete potato in vegetables -> ', vegetables.delete('potato'))
console.log('Does fruits have subset of vegetables ? -> ', fruits.subsetting(vegetables))
console.log('↑', fruits.values(), vegetables.values())