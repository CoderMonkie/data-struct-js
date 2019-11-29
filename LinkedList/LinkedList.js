/**
 * 链表：单向链表
 */
function LinkedList() {
    this.__head = null
    this.__count = 0
    
    function Node(data) {
        this.data = data
        this.next = null
    }

    LinkedList.prototype.append = function(data) {
        var newNode = new Node(data)

        if(this.__count === 0) {
            this.__head = newNode
        } else {
            var current = this.__head
            while(current.next) {
                current = current.next
            }
            current.next = newNode
        }

        this.__count += 1
    }

    LinkedList.prototype.insert = function(position, data) {
        // 边界检查（插入位置）
        if (position < 0 || position > this.__count) return false

        var newNode = new Node(data)

        // 插入到链表头部
        if(position === 0) {
            newNode.next = this.__head
            this.__head = newNode
        }
        // 以外
        else {
            var previous = null
            var current = this.__head
            var index = 0
            while(index < position) {
                previous = current
                current = current.next
                index++
            }
            previous.next = newNode
            newNode.next = current
        }
        this.__count += 1
        return true
    }

    LinkedList.prototype.remove = function(data) {
        var current = this.__head
        var previous = null

        while(current) {
            if(current.data == data) {
                if(previous == null){
                    this.__head = current.next
                } else {
                    previous.next = current.next
                }
                this.__count -= 1
                return true
            }
            previous = current
            current = current.next
        }
        return false
    }

    LinkedList.prototype.removeAt= function (position) {
        // 边界检查
        if (position < 0 || position >= this.__count) return false

        var index = 0
        var previous = null
        var current = this.__head
        while(index++ < position) {
            previous = current
            current = current.next
        }
        previous.next = current.next
        current = null
        this.__count -= 1
    }

    LinkedList.prototype.update = function(position, data) {
        // 边界检查
        if(position < 0 || position >= this.__count) return false
        
        var current = this.__head
        var index = 0

        while(index++ < position) {
            current = current.next
        }
        current.data = data
    }

    LinkedList.prototype.getItem = function(position) {
        // 边界检查
        if(position < 0 || position >= this.__count) return

        var index = 0
        var current = this.__head

        while(index < position) {
            current = current.next
            index += 1
        }
        return current.data
    }

    LinkedList.prototype.indexOf = function(data) {
        var current = this.__head
        var index = 0

        while(current) {
            if(current.data == data) {
                return index
            }
            current = current.next
            index += 1
        }
        return -1
    }

    LinkedList.prototype.size = function() {
        return this.__count
    }

    LinkedList.prototype.isEmpty = function() {
        return this.__count === 0
    }

    LinkedList.prototype.toString = function() {
        var str = '[HEAD] -> '
        var current = this.__head
        while(current) {
            str += current.data + ' -> '
            current = current.next
        }
        if(str === '[HEAD] -> '){
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