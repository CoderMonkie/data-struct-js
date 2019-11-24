function Queue() {
    var __items = []

    Queue.prototype.enqueue = function (element) {
        __items.push(element)
    }

    Queue.prototype.dequeue = function () {
        return __items.shift()
    }

    Queue.prototype.front = function () {
        return __items.length === 0 ? undefined : __items[0]
    }

    Queue.prototype.isEmpty = function () {
        return __items.length === 0
    }

    Queue.prototype.size = function () {
        return __items.length
    }

    Queue.prototype.toString = function () {
        return __items.join(' ')
    }
}
