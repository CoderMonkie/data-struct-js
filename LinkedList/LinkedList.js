/**
 * 链表：单向链表
 */
function LinkedList() {
    // 记录链表首个元素
    this.__head = null
    // 记录链表元素个数
    this.__count = 0

    // 用Node表示链表内部元素
    function Node(data) {
        this.data = data
        this.next = null

        Node.prototype.toString = function () {
            return this.data.toString()
        }
    }

    LinkedList.prototype.append = function (data) {
        // 1.创建新元素
        var newNode = new Node(data)

        // 2.1链表为空时，直接添加到末尾
        if (this.__count === 0) {
            this.__head = newNode
        }
        // 2.2链表非空时，探查到末尾元素并添加新元素
        else {
            var current = this.__head
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }

        // 3.内部计数加1
        this.__count += 1

        return true
    }

    LinkedList.prototype.insert = function (position, data) {
        // 1.边界检查（插入位置）
        if (position < 0 || position > this.__count) return false

        // 2.创建新元素
        var newNode = new Node(data)

        // 3.1插入到链表头部
        if (position === 0) {
            newNode.next = this.__head
            this.__head = newNode
        }
        // 3.2以外（包括插入到末尾）
        else {
            var previous = null
            var current = this.__head
            var index = 0
            while (index < position) {
                previous = current
                current = current.next
                index++
            }
            previous.next = newNode
            newNode.next = current
        }
        // 4.内部计数加1
        this.__count += 1

        return true
    }

    LinkedList.prototype.remove = function (data) {
        var current = this.__head
        var previous = null

        while (current) {
            // 找到指定数据的元素，让当前元素不再被引用
            if (current.data == data) {
                if (previous == null) {
                    // 没有前元素，要删除的是首元素，修改 Head 指针
                    this.__head = current.next
                } else {
                    // 修改前元素内部指针
                    previous.next = current.next
                }
                // 内部计数减1
                this.__count -= 1
                // 处理完成，返回 true
                return true
            }
            previous = current
            current = current.next
        }
        // 查找到最后没有找到指定数据的元素，返回 false
        return false

        // 注：
        // 也可以通过调用 indexOf 获取下标后再调用 removeAt 来实现
        // 只是返回值会不同，看实际需要
    }

    LinkedList.prototype.removeAt = function (position) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return false

        var index = 0
        var previous = null
        var current = this.__head

        // 2.找到指定位置元素
        while (index++ < position) {
            previous = current
            current = current.next
        }
        // 3.使当前元素不再被引用
        previous.next = current.next

        // 4.内部计数减1
        this.__count -= 1

        return current.data
    }

    LinkedList.prototype.update = function (position, data) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return false

        var current = this.__head
        var index = 0

        // 2.找到指定位置元素
        while (index++ < position) {
            current = current.next
        }
        // 3.修改当前元素数据
        current.data = data

        // 4.修改完成，返回 true
        return true
    }

    LinkedList.prototype.getItem = function (position) {
        // 边界检查
        if (position < 0 || position >= this.__count) return

        var index = 0
        var current = this.__head

        while (index < position) {
            current = current.next
            index += 1
        }
        return current.data
    }

    LinkedList.prototype.indexOf = function (data) {
        var current = this.__head
        var index = 0

        while (current) {
            if (current.data == data) {
                return index
            }
            current = current.next
            index += 1
        }
        return -1
    }

    LinkedList.prototype.size = function () {
        return this.__count
    }

    LinkedList.prototype.isEmpty = function () {
        return this.__count === 0
    }

    LinkedList.prototype.clear = function () {
        this.__head = null
        this.__count = 0
    }

    LinkedList.prototype.toString = function () {
        var str = '[HEAD] -> '
        var current = this.__head
        while (current) {
            str += current.toString() + ' -> '
            current = current.next
        }
        if (str === '[HEAD] -> ') {
            str = '[HEAD] -> Null'
        }
        return str
    }
}

// ---------------------------------------------
// Test: LinkedList
// ---------------------------------------------
console.log('----Test: LinkedList----')

var lst = new LinkedList()

lst.append('a')
lst.append('b')
lst.append('c')
console.log(lst.toString())
lst.insert(1, 'insert-1')
console.log(lst.toString())
lst.insert(4, 'insert-4')
console.log(lst.toString())
lst.insert(0, 'insert-0')
console.log(lst.toString())
lst.remove('c')
console.log(lst.toString(), 'remove-c')
console.log('indexOf-b : ', lst.indexOf('b'))
lst.update(3, 'b-updated')
console.log('update-b : ', lst.toString())
lst.removeAt(3)
console.log('after removeAt(3) : ', lst.toString())
lst.clear()
console.log('after clear : ', lst.toString())