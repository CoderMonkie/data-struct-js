/**
 *自定义 console 对象
 * Customized console 
 *
 * @class Console
 */
class Console {
    constructor() {
        if (window && window.console) {
            for (let p in window.console) {
                // 因为要自定义 log 方法，不复制
                if (p == 'log') continue

                // 除了需要自定义的方法，其它都引用原始方法
                this[p] = window.console[p]
            }
        }
    }

    /**
     * 自定义 console.log 方法
     *Customized console.log method
     *
     * @param {*} message
     * @memberof Console
     */
    log(...message) {
        if(!message) return

        let str = ''
        let logDiv = document.createElement('div')
        logDiv.classList.add('log-info')

        message.forEach(msg => {
            if (typeof msg == 'object') {
                str += (JSON && JSON.stringify ? JSON.stringify(msg) : msg) + '<br />';
            } else {
                str += msg + '<br />';
            }
        })

        logDiv.innerHTML = str
        document.body.appendChild(logDiv)

        // also run original method
        window && window.console && window.console.log(...message)
    }
}

// use or not use customized console according to NODE_ENV
const console = (process.env.NODE_ENV === 'production'
    ? window.console
    : new Console())

module.exports = console
module.exports.default = console