/**
 *深拷贝
 *
 * @export
 * @param {*} source 要拷贝的对象
 * @returns 深拷贝结果
 */
export function deepCopy(source) {
    var dest
    if (Array.isArray(source)) {
        dest = []
        for (let i = 0; i < source.length; i++) {
            dest[i] = deepCopy(source[i])
        }
    } else if (toString.call(source) === '[object Object]') {
        dest = {}
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                dest[p] = deepCopy(source[p])
            }
        }
    } else {
        dest = source
    }
    return dest
}

/**
 *判断传入参数是否为函数
 *
 * @export
 * @param {*} func 参数（函数）
 * @returns true：是函数 false：不是函数
 */
export function isFunction(func) {
    if (!func || toString.call(func) !== '[object Function]') return false
    return true
}

/**
 *如果用户未指定则提供默认的比较器函数
 *
 * @export
 * @param {function} customizedComparer 用户指定的比较器函数
 * @returns 比较器函数
 */
export function comparer(customizedComparer) {
    /**
     *默认的比较器函数
     *
     * @param {*} x 要比较的对象1
     * @param {*} y 要比较的对象2
     * @param {boolean} [strict=true] 可选参数：严格比较（true：严格，false：非严格）默认开启
     * @returns {function} 默认的比较器函数
     */
    const defaultComparer = function(x, y, strict=true) {
        return strict ? x === y : x == y
    }

    return (isFunction(customizedComparer)
        ? customizedComparer
        : defaultComparer)
}