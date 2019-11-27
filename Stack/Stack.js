function Stack() {
    this.__items = []

    Stack.prototype.push = function (element) {
        return this.__items.push(element)
    }

    Stack.prototype.pop = function () {
        return this.__items.pop()
    }

    Stack.prototype.peek = function () {
        if (!this.__items.length) return null
        return this.__items[this.__items.length - 1]
    }

    Stack.prototype.isEmpty = function () {
        return this.__items.length === 0
    }

    Stack.prototype.size = function () {
        return this.__items.length
    }

    Stack.prototype.clear = function () {
        this.__items.length = 0
    }

    Stack.prototype.toString = function () {
        return this.__items.join(' ')
    }

    Stack.prototype.getItems = function () {
        return deepCopy(this.__items)
    }

    Stack.prototype.traverse = function (cb) {
        if (!cb || toString.call(cb) !== '[object Function]') return

        var items = this.getItems()
        for (var index = items.length - 1; index >= 0; index--) {
            var element = items[index];
            cb(element, index)
        }
    }
}

function deepCopy(source) {
    var dest
    if(Array.isArray(source)) {
        dest = []
        for (let i = 0; i < source.length; i++) {
            dest[i] =deepCopy(source[i])
        }
    }
    else if(toString.call(source) === '[object Object]') {
        dest = {}
        for(var p in source){
            if(source.hasOwnProperty(p)){
                dest[p]=source[p]
            }
        }
    }
    else {
        dest = source
    }
    return dest
}