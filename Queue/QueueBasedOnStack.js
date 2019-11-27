function QueueBasedOnStack() {

    this.__inStack = new Stack()
    this.__outStack = new Stack()

    QueueBasedOnStack.prototype.enqueue = function(element) {
        this.__inStack.push(element)
    }

    QueueBasedOnStack.prototype.dequeue = function() {
        if(this.__outStack.isEmpty()) {
            while(!this.__inStack.isEmpty()) {
                this.__outStack.push(this.__inStack.pop())
            }
        }
        return this.__outStack.pop()
    }

    QueueBasedOnStack.prototype.size = function() {
        return (this.__inStack.size() + this.__outStack.size())
    }

    QueueBasedOnStack.prototype.clear = function() {
        this.__inStack.clear() 
        this.__outStack.clear()
    }

    QueueBasedOnStack.prototype.toString = function() {
        var items = this.getItems()
        return items.join('--')
    }

    QueueBasedOnStack.prototype.getItems = function() {
        return this.__inStack.getItems().concat(this.__outStack.getItems().reverse())
    }
}

// ---------------------------------------------
// Test: QueueBasedOnStack
// ---------------------------------------------
console.log('----Test: QueueBasedOnStack----')

var qs = new QueueBasedOnStack()
qs.enqueue('A')
console.log('after enqueue: ', qs.toString())
qs.enqueue('B')
console.log('after enqueue: ', qs.toString())
qs.enqueue('C')
qs.enqueue('D')
qs.enqueue('E')
console.log('after enqueue: ', qs.toString())
qs.dequeue()
console.log('after dequeue: ', qs.toString())
qs.dequeue()
console.log('after dequeue: ', qs.toString())
qs.dequeue()
console.log('after dequeue: ', qs.toString())
