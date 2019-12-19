function Queue() {
    this.__items = []

    Queue.prototype.enqueue = function (element) {
        return this.__items.push(element)
    }

    Queue.prototype.dequeue = function () {
        return this.__items.shift()
    }

    Queue.prototype.front = function () {
        return this.__items.length === 0 ? undefined : this.getItems()[0]
    }

    Queue.prototype.getItems = function () {
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

    Queue.prototype.toString = function () {
        return this.__items.join(' ')
    }
}
