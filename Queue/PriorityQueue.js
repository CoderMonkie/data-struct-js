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
    }

    PriorityQueue.prototype.enqueue = function(element, priority) {
        var queueElement = new QueueElement(element, priority)

        if(__items.length === 0) {
            __items.push(queueElement)
        }
        else {
            var added = false
            for(var i=0;i<__items.length;i++) {
                if(queueElement.priority < __items[i].priority) {
                    __items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if(!added) {
                __items.push(queueElement)
            }
        }
    }

    PriorityQueue.prototype.dequeue = function() {
        return this.getItems().shift()
    }

    Queue.prototype.front = function () {
        return this.__items.length === 0 ? undefined : this.getItems()[0]
    }

    PriorityQueue.prototype.getItems = function() {
        return deepCopy(this.__items)
    }
    
    Queue.prototype.isEmpty = function () {
        return this.__items.length === 0
    }

    Queue.prototype.size = function () {
        return this.__items.length
    }

    Stack.prototype.clear = function () {
        this.__items.length = 0
    }
}