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
                dest[p]=deepCopy(source[p])
            }
        }
    }
    else {
        dest = source
    }
    return dest
}
