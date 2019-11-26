function Stack() {
    var __items = []

    Stack.prototype.push = function (element) {
        return __items.push(element)
    }

    Stack.prototype.pop = function () {
        return __items.pop()
    }

    Stack.prototype.peek = function () {
        if (!__items.length) return null
        return __items[__items.length - 1]
    }

    Stack.prototype.isEmpty = function () {
        return __items.length === 0
    }

    Stack.prototype.size = function () {
        return __items.length
    }

    Stack.prototype.clear = function () {
        __items.clear()
    }

    Stack.prototype.toString = function () {
        return __items.join(' ')
    }

    // TODO: need deep-copy
    Stack.prototype.getItems = function () {
        return __items  // TODO
    }

    Stack.prototype.traverse = function (cb) {
        if (!cb || toString.call(cb) !== '[object Function]') return

        var items = this.getItems()
        for (var index = items.length - 1; index >= 0; index--) {
            var element = items[index];
            cb(element)
        }
    }
}