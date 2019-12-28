/**
 * 链表：单向循环链表
 */
function CircleLinkedList() {
    // 记录链表首个元素
    this.__head = null
    this.__tail = null
    this.__count = 0

    // 用Node表示链表内部元素
    function Node(data) {
        this.data = data
        this.next = null

        Node.prototype.toString = function () {
            return this.data.toString()
        }
    }

    // 添加节点
    CircleLinkedList.prototype.append = function (data) {
        
        // 1. 创建新元素
        let newNode = new Node(data)

        // 2.1 链表为空时，直接添加到末尾
        if (this.isEmpty()) {
            this.__head = newNode
            this.__tail = newNode
        }
        // 2.2 链表非空时，末尾添加新元素
        else {
            this.__tail.next = newNode
            this.__tail = newNode
        }
        // 2.3 将新的尾节点的后继指向头节点
        this.__tail.next = this.__head

        // 3. 内部计数加1
        this.__count += 1

        return true
    }

    // 插入节点
    CircleLinkedList.prototype.insert = function (position, data) {
        // 1.边界检查（插入位置）
        if (position < 0 || position > this.__count) return false

        // 2. 创建新元素
        var newNode = new Node(data)

        // 3.1插入到链表头部
        if (position === 0) {
            newNode.next = this.__head
            this.__head = newNode
            this.__tail.next = this.__head

            // 内部计数加1
            this.__count += 1
        }
        // 3.2插入到链表尾部
        else if (position === this.size) {
            this.append(data)
        }
        // 3.3以外
        else {
            let previous = null
            let current = this.__head
            let index = 0
            while (index < position) {
                previous = current
                current = current.next
                index++
            }
            previous.next = newNode
            newNode.next = current

            // 内部计数加1
            this.__count += 1
        }

        return true
    }

    // 删除节点
    CircleLinkedList.prototype.remove = function (data) {

        const position = this.indexOf(data)

        if (position === -1) return false

        return this.removeAt(position)
    }

    // 删除指定位置节点
    CircleLinkedList.prototype.removeAt = function (position) {
        // 1.边界检查
        if (position < 0 || position >= this.__count) return false

        // 2.1.链表中只要一个元素的时候
        if (this.size() === 1) {
            // position 只能是 0
            this.__head = this.__tail = null
        }
        // 2.2.链表中有多个元素的时候
        else {
            let index = 0
            let previous = null
            let current = this.__head

            // 2.2.1.找到指定位置元素
            while (index++ < position) {
                previous = current
                current = current.next
            }
            // 2.2.2.使当前元素不再被引用(当删除的不是头节点)
            previous && (previous.next = current.next)

            // A. 如果删除的是头节点
            if (position === 0) {
                // 更新 head 的指针
                this.__head = current.next
                // 重新连接首尾
                this.__tail.next = this.__head
            }
            // B. 如果删除的是尾节点
            else if (position === this.size() - 1) {
                // 更新 tail 的指针
                this.__tail = previous
            }
        }

        // 3.内部计数减1
        this.__count -= 1

        return true
    }

    // 更新节点
    // 因不涉及指向问题，更新方法与LinkedList相同
    // 实际开发中使用继承自 CircleLinkedList 的 update 方法
    CircleLinkedList.prototype.update = function (position, data) {
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

    // 获取指定位置节点
    CircleLinkedList.prototype.findAt = function (position) {
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

    // 获取下标
    CircleLinkedList.prototype.indexOf = function (data) {
        var current = this.__head
        var index = 0

        // 根据指点数据查找节点元素，探查到尾节点后需停止
        while (index < this.size) {
            if (current.data == data) {
                return index
            }
            current = current.next
            index += 1
        }
        
        return -1
    }

    // 遍历链表
    CircleLinkedList.prototype.traverse = function(callback) {
        // 参数检查（回调函数）
        if (!callback || toString.call(callback) !== '[object Function]') return

        // 计数
        let index = 0
        // 起始元素设为 head
        let current = this.__head

        // 头部起始，向后遍历，到链表尾结束
        while (index < this.size()) {
            callback(current.data)
            current = current.next
            index += 1
        }
    }

    /**
     * 迭代下一个节点
     * 即链表头节点指针后移
     *
     * @returns 所在节点数据
     * @memberof CircleLinkedList
     */
    CircleLinkedList.prototype.getNext = function() {
        if (this.isEmpty()) return undefined
        let current = this.__head
        if (this.size() > 1) {
            this.__head = current.next
            this.__tail = current
        }
        return current.data
    }

    // 获取节点个数
    CircleLinkedList.prototype.size = function () {
        return this.__count
    }

    // 是否空链表
    CircleLinkedList.prototype.isEmpty = function () {
        return this.__count === 0
    }

    // 清空链表
    CircleLinkedList.prototype.clear = function () {
        this.__head = null
        this.__count = 0
    }

    // 获取字符串
    CircleLinkedList.prototype.toString = function () {
        let str = '[ '
        let index = 0
        let current = this.__head
        while (index < this.size) {
            str += current + ' -> '
            current = current.next
            index += 1
        }
        str += ` | Count: ${this.size} ]`
        return str
    }
}

// ---------------------------------------------
// Test: CircleLinkedList
// ---------------------------------------------
console.log('----Test: CircleLinkedList----')

var circle = new CircleLinkedList()

circle.append("1.Plan")
circle.append("2.Do")
circle.append("3.Check")
circle.append("4.Action")
for (let j = 0; j < 6; j++) {
    const item = circle.getNext()
    console.log(`${j} : ${item}`)
}
circle.traverse(item=>{
    console.log(`Traversing : ${item}`)
})