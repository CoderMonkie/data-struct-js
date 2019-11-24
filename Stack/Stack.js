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

    Stack.prototype.toString = function () {
        return __items.join(' ')
    }
}

