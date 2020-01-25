/**
 * Copyright (c) 2020
 * License MIT
 *
 * implement of undirected graph
 *
 * @summary undirected graph
 * @author CoderMonkey <maonianyou@gmail.com>
 *
 * Created at     : 2020-01-24 15:17:02
 * Last modified  : 2020-01-26 00:52:28
 */
import {
    GraphBase,
    VisitStatus,
} from './GraphBase'
import {
    isFunction,
} from '../common/toollib'
import {
    Stack
} from '../Stack'
import {
    Queue
} from '../Queue/Queue.js'

/**
 * 
 * @description 使用邻接多重表实现无向图
 * @export UndirectedGraph
 * @class UndirectedGraph
 */
export class UndirectedGraph extends GraphBase {
    constructor(customizedComparer = null) {
        super(customizedComparer)

        this.__findVertex = function (data) {
            if (this.vertexCount === 0) return undefined

            return this.__vertexes.find(v => {
                return this.__comparator(v.data, data)
            })
        }

        this.__findArc = function (arc, v1, v2) {
            while (arc) {
                if (arc.hasVertex(v2)) return arc
                arc = arc.nextArc(v1)
            }
            return null
        }

        this.__updateVisitStatus = function (map, v) {
            map.set(v, VisitStatus.VISITED)
            return Array.from(map)
        }

        /**
         * 用字符串表示出该图的信息
         * 显示所有的邻接点
         */
        this.toString = function () {
            let str = ''
            this.__vertexes.forEach(v => {

                str += `${v.data.toString()} -> [`

                let arc = v.first

                while (arc) {
                    if (v === arc.vertex1) {
                        str += `${arc.vertex2.data.toString()},`
                        arc = arc.orderNext
                    } else {
                        // v === arc.vertex2
                        str += `${arc.vertex1.data.toString()},`
                        arc = arc.reverseNext
                    }
                }

                str += ']\r\n'
            })
            return str
        }
    }


    /**
     * @description 添加顶点
     *
     * @param {*} data
     * @memberof UndirectedGraph
     */
    addVertex(data) {
        if (data == null) throw new Error(`parameter error: data is ${data}`)
        let v = new VertexNode(data)
        this.__vertexes.push(v)
    }


    /**
     * @description 添加或更新邻接边
     *
     * @param {*} data1
     * @param {*} data2
     * @param {*} info
     * @memberof UndirectedGraph
     */
    setArc(data1, data2, info) {
        let v1 = this.__findVertex(data1)
        if (!v1) v1 = new VertexNode(data1)

        let v2 = this.__findVertex(data2)
        if (!v2) v2 = new VertexNode(data2)

        // let arc = this.__findArc(v1.first, v1, v2) || this.__findArc(v2.first, v2, v1)
        let arc = this.__findArc(v1.first, v1, v2)

        if (!arc) {
            arc = new Arc(v1, v2, info)

            let tempArc = v1.first
            let pre = tempArc
            if (!tempArc) {
                v1.first = arc
            } else {
                while (tempArc) {
                    pre = tempArc
                    tempArc = tempArc.nextArc(v1)
                }
                if (pre.vertex1 === v1) {
                    pre.orderNext = arc
                } else {
                    pre.reverseNext = arc
                }
            }

            tempArc = v2.first
            pre = tempArc

            if (!tempArc) {
                v2.first = arc
            } else {
                while (tempArc) {
                    pre = tempArc
                    tempArc = tempArc.nextArc(v2)
                }
                if (pre.vertex1 === v2) {
                    pre.orderNext = arc
                } else {
                    pre.reverseNext = arc
                }
            }
        } else {
            arc.info = info
        }
    }


    /**
     * 广度优先遍历
     *
     * @param {*} start
     * @param {function} callback
     * @memberof UndirectedGraph
     */
    bfsTraverse(start, callback) {
        let vertex = null
        let index = 0

        // 参数检查：
        //  1. 两个参数的时候：指定起点和遍历的回调函数
        if (start && callback) {
            if (!isFunction(callback)) throw new Error(`${callback} is not a function.`)

            vertex = this.__findVertex(start)
            if (vertex === undefined) throw new Error(`vertex of ${start} doesnot exist.`)
        }
        //  2.1 一个参数的时候，仅指定遍历的回调函数
        else if (isFunction(start) && !callback) {
            callback = start
            start = null
            vertex = this.__vertexes[index]
        }
        //  2.2 两个参数的时候，仅指定遍历的回调函数
        else if (start == null && isFunction(callback)) {
            vertex = this.__vertexes[index]
        }
        //  3. 参数错误的其它情况
        else {
            throw new Error(`parameter error: need [vStart, callback] or [callback].\r\nreceived: ${start}, ${callback}`)
        }

        // 广度优先：使用队列
        let queue = new Queue()
        let map = new Map()
        this.__vertexes.forEach(v => {
            map.set(v, VisitStatus.INIT)
        })
        let visitList = Array.from(map)

        while (vertex) {
            queue.enqueue(vertex)

            let arc = vertex.first

            while (arc) {
                let currentV = queue.dequeue()

                // 只访问还未访问过的顶点
                if (map.get(currentV) === VisitStatus.INIT) {
                    callback(currentV.data)
                    visitList = this.__updateVisitStatus(map, currentV)
                }

                queue.enqueue(arc.otherVertex(vertex))

                arc = arc.nextArc(vertex)
            }

            // --循环--
            // 未指定起始顶点的时候
            if (start == null) {
                index += 1
                vertex = index >= this.__vertexes.length ? null : this.__vertexes[index]
            }
            // 指定了起始顶点的时候
            else {
                let status = visitList.find(kv => {
                    return kv[1] === VisitStatus.INIT
                })
                vertex = status && status[0]
            }
        }
    }

    dfsTraverse(start, callback) {
        // TODO
    }
}

/**
 * @description 无向图内部用顶点类
 * @class VertexNode
 */
class VertexNode {
    constructor(data) {
        this.data = data
        this.first = null
    }
}


/**
 * @description 无向图内部用边类
 * @class Arc
 */
class Arc {
    constructor(v1, v2, info) {
        this.vertex1 = v1       // VertexNode
        this.vertex2 = v2       // VertexNode
        this.orderNext = null   // Arc
        this.reverseNext = null // Arc
        this.info = info        // *
    }
    
    /**
     * @description 指定顶点的下一条邻接边
     *
     * @param {VertexNode} v 顶点
     * @returns Arc | null
     * @memberof Arc
     */
    nextArc(v) {
        if (v === this.vertex1) {
            return this.orderNext
        } else if (v === this.vertex2) {
            return this.reverseNext
        }
        return null
    }

    /**
     * @description 当前边是否包含指定顶点
     *
     * @param {VertexNode} v 顶点
     * @returns true | false
     * @memberof Arc
     */
    hasVertex(v) {
        return (v === this.vertex1 || v === this.vertex2)
    }

    /**
     * @description 指定顶点所在当前邻接边的另一端
     *
     * @param {VertexNode} v 顶点
     * @returns VertexNode | null
     * @memberof Arc
     */
    otherVertex(v) {
        if (v === this.vertex1) {
            return this.vertex2
        } else if (v === this.vertex2) {
            return this.vertex1
        }
        return null
    }
}
