/**
 * 深拷贝
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
 * 判断传入参数是否为函数
 *
 * @export
 * @param {function|null} func 参数（函数）
 * @returns true：是函数 false：不是函数
 */
export function isFunction(func) {
    if (!func || toString.call(func) !== '[object Function]') return false
    return true
}

/**
 * 如果用户未指定则提供默认的比较器函数
 *
 * @export
 * @param {function} customizedComparer 用户指定的比较器函数
 * @returns 比较器函数
 */
export function eqComparer(customizedComparer) {
    /**
     *默认的比较器函数
     *
     * @param {*} x 要比较的对象1
     * @param {*} y 要比较的对象2
     * @param {boolean} [strict=true] 可选参数：严格比较（true：严格，false：非严格）默认开启
     * @returns {function} 默认的比较器函数
     */
    const defaultComparer = function (x, y, strict = true) {
        return strict ? x === y : x == y
    }

    return (isFunction(customizedComparer) ?
        customizedComparer :
        defaultComparer)
}

export const COMPARE_EQUAL = 0
export const COMPARE_GREATER = 1
export const COMPARE_LESS = -1

/**
 * 比较器函数
 *
 * @export
 * @param {function|null} customizedComparer 指定的比较器函数
 * @returns 如果有指定则返回指定的，没有则返回默认的比较器函数
 */
export function comparator(customizedComparer) {
    const defaultComparer = function (x, y) {
        const val = x - y
        if (val > 0) {
            return COMPARE_GREATER
        } else if (val < 0) {
            return COMPARE_LESS
        } else {
            return COMPARE_EQUAL
        }
    }
    return (isFunction(customizedComparer) ?
        customizedComparer :
        defaultComparer)
}

/**
 * 是否为质数(素数)
 *   质数：
 *   只能被1和自己本身整除
 * @export
 * @param {number} num 要判断的数字
 * @returns 判断结果：true/false
 */
export function isPrime(num) {

    // function isPrime(num){
    //     for (let i = 2; i < num; i++) {
    //         if(num % i === 0){
    //             return false
    //         }            
    //     }        
    //     return true
    // }
    // improve:

    // 可被整除的数里面，只需检测一半即可，所以先取平方根
    // （一个大于等于平方根，一个小于等于）
    let sqrt = parseInt(Math.sqrt(num))

    for (let i = 2; i <= sqrt; i++) {
        if (num % i === 0) {
            return false
        }
    }

    return true
}

/**
 * 判断传入参数是否为数字
 *
 * @export
 * @param {number} num 要判断的数字参数
 * @returns 判断结果：true/false
 */
export function isValidNum(num) {
    return toString.call(num) === '[object Number]' || !Number.isNaN(num)
}

/**
 * 获取下一个质数
 *
 * @export
 * @param {number} num 起始数字
 * @returns 质数数字
 */
export function getNextPrime(num) {
    // 参数检查：必须是一个数字
    if (!isValidNum(num)) throw new Error('parameter [num] must be set to a number.')

    while (!isPrime(num)) {
        num++
    }
    return num
}