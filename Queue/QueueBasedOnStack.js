function QueueBasedOnStack() {

    var stack = new Stack()
    var stackReverse = new Stack()

    QueueBasedOnStack.prototype.enqueue = function(element) {
        stack.push(element)
    }

    QueueBasedOnStack.prototype.dequeue = function() {
        if(stackReverse.isEmpty()) {
            while(!stack.isEmpty()) {
                stackReverse.push(stack.pop())
            }
        }
        return stackReverse.pop()
    }

    QueueBasedOnStack.prototype.size = function() {
        return (stack.size() + stackReverse.size())
    }

    QueueBasedOnStack.prototype.toString = function() {
        var part1 = stackReverse.getItems()
        var part2 = stack.getItems()
        var ret = '['
        while(part1.length) {
            ret += ' '+ part1.pop()
        }
        while(part2.length) {
            ret += ' '+ part2.shift()
        }
        ret += ']'
        return ret
    }
}

// ---------------------------------------------
// Test: QueueBasedOnStack
// ---------------------------------------------
console.log('----Test: QueueBasedOnStack----')

var qs = new QueueBasedOnStack()
qs.enqueue('~')
qs.enqueue('C')
qs.enqueue('o')
qs.enqueue('d')
qs.enqueue('e')
qs.enqueue('r')
qs.enqueue('-')
qs.enqueue('-')
console.log('before dequeue: ', qs.toString())
qs.dequeue()
console.log('after dequeue: ', qs.toString())
qs.dequeue()
console.log('after dequeue: ', qs.toString())
qs.enqueue('M')
qs.enqueue('o')
qs.enqueue('n')
qs.enqueue('k')
qs.enqueue('e')
qs.enqueue('y')
qs.enqueue('~')
console.log('before dequeue: ', qs.toString())
qs.dequeue()
console.log('after dequeue: ', qs.toString())
