/**
 * 链表：双向链表
 */
function DoublyLinkedList() {
    // 记录链表首元素
    this.__head = null
    // 记录链表尾元素
    this.__tail = null
    // 记录链表元素个数
    this.__count = 0

    // 用Node表示链表内部元素
    function Node(data) {
        this.data = data
        this.prev = null // 指向前元素
        this.next = null // 指向后元素

        Node.prototype.toString = function () {
            return this.data.toString()
        }
    }

    DoublyLinkedList.prototype.append = function (data) {
        var newNode = new Node(data)

        // 1.判断链表是否为空
        if (this.__count === 0) {
            // 新元素既是首也是尾
            this.__head = newNode
            this.__tail = newNode
        }
        // 2.非空链表时，添加到尾部
        else {
            this.__tail.next = newNode
            newNode.prev = this.__tail
            this.__tail = newNode
        }

        // 3.计数加1
        this.__count += 1
    }

    DoublyLinkedList.prototype.insert = function (position, data) {
        // 1.边界检查（插入位置）
        if (position < 0 || position > this.__count) return false

        var newNode = new Node(data)

        // 2.插入元素时链表为空
        if (this.__count === 0) {
            this.__head = newNode
            this.__tail = newNode
        }
        // 3.链表非空
        else {
            // 3.1插入到链表头部
            if (position === 0) {
                newNode.next = this.__head
                this.__head.prev = newNode
                this.__head = newNode
            }
            // 3.2插入到链表尾部
            else if (position === this.__count) {
                this.__tail.next = newNode
                newNode.prev = this.__tail
                this.__tail = newNode
            }
            // 3.3以外
            else {
                var current = this.__head
                var index = 0
                while (index < position) {
                    current = current.next
                    index++
                }
                current.prev.next = newNode
                newNode.prev = current.prev
                newNode.next = current
                current.prev = newNode
            }
        }

        // 4.计数加1
        this.__count += 1

        return true
    }

    DoublyLinkedList.prototype.removeAt = function (position) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return null

        var current = this.__head

        // 2.只有一个元素
        if (this.size() === 1) {
            this.__head = null
            this.__tail = null
        }
        // 3.多个元素的情况
        else {
            // 3.1 删首
            if (position === 0) {
                current = this.__head

                this.__head = current.next
                current.next.prev = null
            }
            // 3.2 删尾
            else if (position === this.__count - 1) {
                current = this.__tail
                this.__tail = current.prev
                this.__tail.next = null
            }
            // 3.3 以外
            else {
                var index = 0
                var current = this.__head
                while (index < position) {
                    current = current.next
                    index += 1
                }
                current.prev.next = current.next
                current.next.prev = current.prev
            }
        }

        // 4.计数减1
        this.__count -= 1

        return current.data
    }

    DoublyLinkedList.prototype.remove = function (data) {
        // 根据指定数据取得下标值
        var index = this.indexOf(data)

        // 检查下标值是否正常取到
        if (index === -1) return null

        // 根据取到的下标，调用 removeAt 方法进行删除
        return this.removeAt(index)
    }

    DoublyLinkedList.prototype.update = function (position, data) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return false

        var current = this.__head
        var index = 0

        // 2.找到指定下标位置元素
        while (index < position) {
            current = current.next
        }

        // 3.修改数据
        current.data = data

        return true
    }

    DoublyLinkedList.prototype.getItem = function (position) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return

        var current = this.__head
        var index = 0

        // 2.找到指定下标位置元素
        // => TODO：改善：根据position所在位置选择从Head还是从Tail开始查找
        while (index++ < position) {
            current = current.next
        }
        return current.data
    }

    DoublyLinkedList.prototype.indexOf = function (data) {
        var current = this.__head
        var index = 0

        // 查找指定数据的节点
        while (current) {
            if (current.data == data) {
                return index
            }
            current = current.next
            index += 1
        }
        // 没有找到
        return -1
    }

    DoublyLinkedList.prototype.traverse = function (cb, reversal) {
        if (!reversal) return this.forwardTraverse(cb)
        return backwardTraverse(cb)
    }

    // Forward: Tail -> Head
    DoublyLinkedList.prototype.forwardTraverse = function (cb) {
        // TODO: cb 参数检查（回调函数）

        var current = this.__tail
        while (current) {
            cb(current.data)
            current = current.prev
        }
    }

    // Backward: Head -> Tail
    DoublyLinkedList.prototype.backwardTraverse = function (cb) {
        // TODO: cb 参数检查（回调函数）

        var current = this.__head

        while (current) {
            cb(current.data)
            current = current.next
        }
    }

    DoublyLinkedList.prototype.getHead = function () {
        if (this.__head == null) return null
        return this.__head.data
    }

    DoublyLinkedList.prototype.getTail = function () {
        if (this.__tail == null) return null
        return this.__tail.data
    }

    DoublyLinkedList.prototype.size = function () {
        return this.__count
    }

    DoublyLinkedList.prototype.isEmpty = function () {
        return this.__count === 0
    }

    DoublyLinkedList.prototype.clear = function () {
        this.__head = null
        this.__tail = null
        this.__count = 0
    }

    DoublyLinkedList.prototype.toString = function () {
        var str = '[HEAD]'
        var current = this.__head
        while (current) {
            str += ' -> ' + current.data
            current = current.next
        }
        str += str == '[HEAD]' ?
            ' -> Null <- [TAIL]' :
            ' <- [TAIL]'
        return str
    }
}

// ---------------------------------------------
// Test: DoublyLinkedList
// ---------------------------------------------
console.log('----Test: DoublyLinkedList----')

var dLst = new DoublyLinkedList()

dLst.append('a')
dLst.append('b')
dLst.append('c')
dLst.forwardTraverse(function (val) {
    console.log('forward-traversing: ', val)
})
dLst.backwardTraverse(function (val) {
    console.log('backward-traversing: ', val)
})
dLst.insert(0, 'Insert-Index=0')
dLst.insert(3, 'Insert-Index=3')
dLst.insert(5, 'Insert-Index=Count')
console.log(dLst.toString())
console.log('getItem(5) => ', dLst.getItem(5))
console.log('remove("c") => ', dLst.remove('c'))
console.log('removeAt(3) => ', dLst.removeAt(3))
console.log('[removeAt(3)]--Result ↓ \r\n', dLst.toString())
dLst.clear()
console.log('After Clear : ', dLst.toString())