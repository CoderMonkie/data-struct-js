function HashMap() {
    this.items = []

    var loseloseHashCode = function(key) {
        var len = key.length
        var hash = 0
        for (let i = 0; i < len; i++) {
            hash += key.charCodeAt(i)            
        }
        console.log(`${key} => HashCode: ${hash}`)
        return hash % 37
    }

    HashMap.prototype.put = function(key, value) {
        var index = loseloseHashCode(key)
        this.items[index] = value
    }

    HashMap.prototype.getItem = function(key) {
        var index = loseloseHashCode(key)
        return this.items[index]
    }
}

// ---------------------------------------------
// Test: HashMap
// ---------------------------------------------
console.log('----Test: HashMap----')

var hashMap = new HashMap()
hashMap.put('Lobs', '@gmail.com')
hashMap.put('Join', '@gmail.com')
hashMap.put('Donnie', '@gmail.com')
hashMap.put('Donnie', '@gmail.com')
