function PriorityQueue() {
    this.__items = []

    function QueueElement(element, priority) {
        // check priority
        if(typeof(priority) != 'number' || Number.isNaN(priority)) {
            // min-level: Infinity
            priority = Infinity
        }
        this.__element = element
        // max-level: 0
        this.__priority = priority

        QueueElement.prototype.priority = function() {
            return this.__priority
        }

        QueueElement.prototype.toString = function() {
            return this.__element.toString.apply(this.__element)
        }
    }

    PriorityQueue.prototype.enqueue = function(element, priority) {
        var queueElement = new QueueElement(element, priority)

        if(this.__items.length === 0) {
            this.__items.push(queueElement)
        }
        else {
            var added = false
            for(var i=0;i<this.__items.length;i++) {
                if(queueElement.priority() < this.__items[i].priority()) {
                    this.__items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if(!added) {
                this.__items.push(queueElement)
            }
        }
    }

    PriorityQueue.prototype.dequeue = function() {
        return this.getItems().shift()
    }

    PriorityQueue.prototype.front = function () {
        return this.__items.length === 0 ? undefined : this.getItems()[0]
    }

    PriorityQueue.prototype.getItems = function() {
        return deepCopy(this.__items)
    }
    
    PriorityQueue.prototype.isEmpty = function () {
        return this.__items.length === 0
    }

    PriorityQueue.prototype.size = function () {
        return this.__items.length
    }

    PriorityQueue.prototype.clear = function () {
        this.__items.length = 0
    }

    PriorityQueue.prototype.toString = function () {
        var arrStr = this.__items.map((qe)=>{
            return qe.toString()
        })
        return arrStr.join('\r\n')
    }
}

// ---------------------------------------------
// Test: PriorityQueue
// ---------------------------------------------
console.log('----Test: QueueBasedOnStack----')

var pq = new PriorityQueue()

pq.enqueue({name: '1-First Element | Priority:1', age: 18, toString: function(){return this.name}}, 1)
pq.enqueue({name: '2-Second Element | Priority:3', age: 18, toString: function(){return this.name}}, 3)
pq.enqueue({name: '3-Third Element | Priority:2', age: 18, toString: function(){return this.name}}, 2)

console.log(pq.toString())