/**
 * 链表：双向链表
 */
function DoublyLinkedList() {
    this.__head = null
    this.__tail = null
    this.__count = 0
    
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }

    LinkedList.prototype.append = function(data) {
        var newNode = new Node(data)

        // 1.判断链表是否为空
        if(this.__count === 0) {
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

    LinkedList.prototype.insert = function(position, data) {
        // 1.边界检查（插入位置）
        if (position < 0 || positon > this.__count) return false

        var newNode = new Node(data)

        // 2.插入元素时链表为空
        if(this.__count === 0) {
            this.__head = newNode
            this.__tail = newNode
        }
        // 3.链表非空
        else {
            // 3.1插入到链表头部
            if(position === 0) {
                newNode.next = this.__head
                this.__head.prev = newNode
                this.__head = newNode
            }
            // 3.2插入到链表尾部
            else if(possition === this.__count) {
                this.__tail.next = newNode
                newNode.prev = this.__tail
                this.__tail = newNode
            }
            // 3.3以外
            else {
                var current = this.__head
                var index = 0
                while(index < position) {
                    current = current.next
                    index++
                }
                current.pre.next = newNode
                newNode.prev = current.prev
                newNode.next = current
                current.prev = newNode
            }
        }

        // 4.计数加1
        this.__count += 1
        
        return true
    }

    LinkedList.prototype.remove = function(data) {
        // 根据指定数据取得下标值
        var index = this.indexOf(data)
        // 检查下标值是否正常取到
        if(index === -1) return null

        // 调用 removeAt 方法进行删除
        return this.removeAt(index)
    }

    LinkedList.prototype.removeAt= function (positon) {
        // 1.边界检查
        if(position <  0 || position >= this.__count) return null
        
        var current = this.__head

        // 2.只有一个元素
        if(this.size() === 1){
            this.__head = null
            this.__tail = null
        }
        // 3.多个元素的情况
        else {
            // 3.1 删首
            if(position === 0){
                current = this.__head
        
                this.__head = current.next
                current.next.prev = null
            }
            // 3.2 删尾
            else if(positon === this.__count - 1) {
                current = this.__tail
                this.__tail = current.prev
                this.__tail.next = null
            }
            // 3.3 以外
            else {
                var index = 0
                var current = this.__head
                while(index < positon) {
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

    LinkedList.prototype.update = function(position, data) {
        // 边界检查
        if(position <  0 || position >= this.__count) return false

        var current = this.__head
        var index = 0

        // 找到指定下标位置元素
        while(index < position) {
            current = current.next
        }
        current.data = data
        return true
    }

    LinkedList.prototype.getItem = function(position) {
        // 边界检查
        if(position <  0 || position >= this.__count) return

        var current = this.__head
        var index = 0

        // 找到指定下标位置元素
        // => TODO：改善：根据position所在位置选择从Head还是从Tail开始查找
        while(index < position) {
            current = current.next
        }
        return current.data
    }

    LinkedList.prototype.indexOf = function(data) {
        var current = this.__head
        var index = 0

        // 查找指定数据的节点
        while(current) {
            if(current.data == data) {
                return index
            }
            current = current.next
            index += 1
        }
        // 没有找到
        return -1
    }

    LinkedList.prototype.size = function() {
        return this.__count
    }

    LinkedList.prototype.isEmpty = function() {
        return this.__count === 0
    }

    LinkedList.prototype.toString = function() {
        var str = '[HEAD]'
        var current = this.__head
        while(current) {
            str += ' -> ' + current.data
            current = current.next
        }
        str += str=='[HEAD]' 
            ? ' -> Null <- [TAIL]'
            : ' <- [TAIL]'
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
dLst.insert(0, '0')
dLst.insert(5, '5')
console.log(lst.toString())