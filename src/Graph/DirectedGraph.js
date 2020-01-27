/**
 * Copyright (c) 2020
 * 
 * MIT
 *
 * implement of directed graph
 *
 * @summary directed graph
 * @author CoderMonkey <maonianyou@gmail.com>
 *
 * Created at     : 2020-01-22 21:35:06
 * Last modified  : 2020-01-27 20:58:02
 */
import {
    isFunction,
} from '../common/toollib'
import {
    Stack
} from '../Stack.js'
import {
    GraphBase,
    VisitStatus,
} from './GraphBase'
import { Queue } from '../Queue/Queue'

/**
 * @description
 * 有向图
 * 使用十字链表实现
 * 
 * @export
 * @class DirectedGraph
 */
export class DirectedGraph extends GraphBase {
    constructor(customizedComparer = null) {
        super(customizedComparer)

        this.toString = function () {
            let str = ''
            this.__vertexes.forEach(v => {

                str += `${v.data.toString()} ->\r\n    Out: [`

                let arcOut = v.firstOut
                while (arcOut) {
                    str += `${arcOut.end.data.toString()},`
                    arcOut = arcOut.nextOut
                }

                str += '],\r\n    In:   ['

                let arcIn = v.firstIn
                while (arcIn) {
                    str += `${arcIn.start.data.toString()}`,
                    arcIn= arcIn.nextIn
                }

                str += ']\r\n'
            })
            return str
        }
    }

    /**
     * @description 添加顶点
     *
     * @param {*} data 顶点数据
     * @returns 添加结果：成功true/失败false
     * @memberof DirectedGraph
     */
    addVertex(data) {
        if (data == null) throw new Error(`parameter error: data is ${data}`)
        if (this.hasVertex(data)) return false

        let v = new VertexNode(data)
        this.__vertexes.push(v)

        return true
    }

    /**
     * @description 添加/更新边
     *
     * @param {*} o1 顶点数据1
     * @param {*} o2 顶点数据2
     * @param {*} [info=null] 边的数据
     * @returns 添加/更新结果：成功true/失败fasle
     * @memberof DirectedGraph
     */
    setArc(o1, o2, info = null) {
        let v1 = this.__findVertex(o1)
        let v2 = this.__findVertex(o2)

        let arc = null

        // 检查该边是否存在
        if (v1 && v2) {
            arc = this.__findArc(v1, v2)
        } else {
            if (!v1) {
                v1 = new VertexNode(data1)
                this.__vertexes.push(v1)
            }

            if (!v2) {
                v2 = new VertexNode(data2)
                this.__vertexes.push(v2)
            }
        }

        // 不存在：添加边
        if (!arc) {
            arc = new Arc(v1, v2, info)

            // 从 v1 到 v2，画一条边线(v1 的出边，v2 的入边)
            this.__addOutArc(v1, arc)
            this.__addInArc(v2, arc)
        }
        // 存在：更新边（权重值等信息）
        else {
            arc.info = info
        }

        return true
    }

    /**
     * @description 广度优先遍历
     *
     * @param {*} start 遍历的起始顶点
     * @param {function} callback 回调函数
     * @memberof UndirectedGraph
     */
    bfsTraverse(start, callback) {
        if (this.vertexCount === 0) return

        let vertex = null

        // 参数检查：
        // --1. 两个参数的时候：指定起点和遍历的回调函数
        if (start && callback) {
            if (!isFunction(callback)) throw new Error(`${callback} is not a function.`)

            vertex = this.__findVertex(start)
            if (vertex === undefined) throw new Error(`vertex of ${start} doesnot exist.`)
        }
        // --2.1 一个参数的时候，仅指定遍历的回调函数
        else if (isFunction(start) && !callback) {
            callback = start
            start = null
            vertex = this.__vertexes[0]
        }
        // --2.2 两个参数的时候，仅指定遍历的回调函数
        else if (start == null && isFunction(callback)) {
            vertex = this.__vertexes[0]
        }
        // --3. 参数错误的其它情况
        else {
            throw new Error(`parameter error: need [vStart, callback] or [callback].\r\nreceived: ${start}, ${callback}`)
        }

        // 广度优先：使用队列
        let queue = new Queue()
        // 初始化探索状态
        let map = this.__initVisitStatus()

        while (vertex) {
            // 如果当前顶点未被探索，则探索（回调访问）
            if (map.get(vertex) !== VisitStatus.VISITED) {
                let stop = callback(vertex.data)
                if (stop) return
                map.set(vertex, VisitStatus.VISITED)
            }

            let arc = vertex.firstOut

            while (arc) {
                let vEnd = arc.end

                // 如果另一端顶点未被发现或探索，则加入队列并标记
                if (map.get(vEnd) === VisitStatus.INIT) {
                    queue.enqueue(vEnd)
                    map.set(vEnd, VisitStatus.DISCOVERED)
                }

                // 下一组出边
                arc = arc.nextOut
            }

            // 下一层顶点
            vertex = (queue.dequeue() || this.__getNextVertex(map))
        }
    }

    /**
     * @description 深度优先遍历
     *
     * @param {*} start 遍历的起始顶点
     * @param {function} callback 回调函数
     * @memberof UndirectedGraph
     */
    dfsTraverse(start, callback) {
        if (this.vertexCount === 0) return

        let vertex = null

        // 参数检查：
        // --1. 两个参数的时候：指定起点和遍历的回调函数
        if (start && callback) {
            if (!isFunction(callback)) throw new Error(`${callback} is not a function.`)

            vertex = this.__findVertex(start)
            if (vertex === undefined) throw new Error(`vertex of ${start} doesnot exist.`)
        }
        // --2.1 一个参数的时候，仅指定遍历的回调函数
        else if (isFunction(start) && !callback) {
            callback = start
            start = null
            vertex = this.__vertexes[0]
        }
        // --2.2 两个参数的时候，仅指定遍历的回调函数
        else if (start == null && isFunction(callback)) {
            vertex = this.__vertexes[0]
        }
        // --3. 参数错误的其它情况
        else {
            throw new Error(`parameter error: need [vStart, callback] or [callback].\r\nreceived: ${start}, ${callback}`)
        }

        // 深度优先：使用栈
        let stack = new Stack()
        // 初始化探索状态
        let map = this.__initVisitStatus()

        while (vertex) {
            // 如果未探索该顶点，则探索（回调）并标记
            if (map.get(vertex) !== VisitStatus.VISITED) {
                let stop = callback(vertex.data)
                if (stop) return
                
                map.set(vertex, VisitStatus.VISITED)
                stack.push(vertex)
            }

            let arc = vertex.firstOut

            while (arc) {
                let vNext = arc.end

                // 如果未探索，则探索（回调）并标记
                if (map.get(vNext) !== VisitStatus.VISITED) {
                    callback(vNext.data)
                    map.set(vNext, VisitStatus.VISITED)

                    // 记录该顶点以备回溯
                    stack.push(vNext)
                    
                    arc = vNext.firstOut
                }
                // 回溯后探索其它分支
                else {
                    arc = arc.nextOut
                }
            }

            // 回溯或跳转顶点
            vertex = (stack.pop() || this.__getNextVertex(map))
        }
    }

    /**
     * @description 给顶点添加入边
     * 
     * @param {VertexNode} v
     * @param {Arc} arc
     */
    __addInArc(v, arc) {
        let adjArc = v.firstIn

        // 没有入边
        if (adjArc === null) {
            v.firstIn = arc
        }
        // 已有入边
        else {
            while (adjArc.nextIn) {
                adjArc = adjArc.nextIn
            }
            adjArc.nextIn = arc
        }
    }

    /**
     * @description 给顶点添加出边
     * 
     * @param {VertexNode} v
     * @param {Arc} arc
     */
    __addOutArc(v, arc) {
        let adjArc = v.firstOut

        // 没有出边
        if (adjArc === null) {
            v.firstOut = arc
        }
        // 已有出边
        else {
            while (adjArc.nextOut) {
                adjArc = adjArc.nextOut
            }
            adjArc.nextOut = arc
        }
    }

    /**
     * @description 查找边
     *
     * @param {VertexNode} v1 顶点1
     * @param {VertexNode} v2 顶点2
     * @returns Arc | undefined
     * @memberof DirectedGraph
     */
    __findArc(v1, v2) {
        let arc = v1.firstOut
        while (arc) {
            if (v2 === arc.end) return arc
            arc = arc.nextOut
        }
    }

    /**
     * @description 
     * 如果指定的起始顶点没有出边，
     * 则无法进行后面其它顶点的遍历，
     * 这里找出下一个未访问过的顶点，
     * 继续循环遍历（广度/深度优先）
     *
     * @param {Map<VertexNode, VisitStatus>} map
     * @memberof DirectedGraph
     */
    __getNextVertex(map) {
        let list = Array.from(map)
        let statusKV = list.find(kv => {
            return kv[1] !== VisitStatus.VISITED
        })
        let vertex = statusKV && statusKV[0]
        return vertex
    }

}

/**
 * @description 有向图内部用顶点类
 *
 * @class VertexNode
 */
class VertexNode {
    constructor(data) {
        if (data == null) throw new Error(`vertex cannot be null`)
        this.data = data
        this.firstIn = null     // Arc
        this.firstOut = null    // Arc
    }

    toString() {
        return `${this.data.toString()}`
    }
}

/**
 * @description 有向图内部用边类
 *
 * @class Arc
 */
class Arc {
    constructor(start, end, info = null) {
        this.start = start      // VertexNode
        this.end = end          // VertexNode
        this.nextIn = null      // Arc
        this.nextOut = null     // Arc
        this.info = info        // Weight info etc.
    }
    
    toString() {
        return `
            {
                start: ${this.start.toString()},
                end: ${this.end.toString()},
                info: ${this.info ? this.info.toString() : null},
            }
        `
    }
}