import {
    eqComparer
} from '../common/toollib'

/**
 * 有向图
 * 使用多重链表实现
 * @export
 * @class DirectedGraph
 */
export class DirectedGraph {
    constructor(customizedComparer = null) {
        this.__comparator = eqComparer(customizedComparer)
        this.__vertexes = []
        this.__arcs = []

        /**
         * 给顶点添加入边
         * @param {VertexNode} v
         * @param {Arc} arc
         */
        this.__addInArc = function(v, arc) {
            let adjArc = v.firstIn

            // 没有入边
            if (adjArc === null) {
                v.firstIn = arc
            }
            // 已有入边
            else {
                while(!adjArc.nextIn) {
                    adjArc = adjArc.nextIn
                }
                adjArc.nextIn = arc
            }
        }

        /**
         * 给顶点添加出边
         * @param {VertexNode} v
         * @param {Arc} arc
         */
        this.__addOutArc = function(v, arc) {
            let adjArc = v.firstOut
            
            // 没有出边
            if(adjArc === null) {
                v.firstOut = arc
            }
            // 已有出边
            else {
                while(!adjArc.nextOut) {
                    adjArc = adjArc.nextOut
                }
                adjArc.nextOut = arc
            }
        }

        this.toString = function () {

        }
    }

    /**
     * 顶点个数
     *
     * @readonly
     * @memberof DirectedGraph
     */
    get vertexCount() {
        return this.__vertexes.length
    }

    /**
     * 边的条数
     *
     * @readonly
     * @memberof DirectedGraph
     */
    get arcCount() {
        return this.__arcs.length
    }

    /**
     * 添加顶点
     *
     * @param {*} data 顶点数据
     * @returns 添加结果：成功true/失败false
     * @memberof DirectedGraph
     */
    addVertex(data) {
        if (this.hasVertex(data)) return false

        let v = new VertexNode(data)
        this.__vertexes.push(v)
        
        return true
    }

    /**
     * 添加/更新边
     *
     * @param {*} o1 顶点数据1
     * @param {*} o2 顶点数据2
     * @param {*} [info=null] 边的数据
     * @returns 添加/更新结果：成功true/失败fasle
     * @memberof DirectedGraph
     */
    setArc(o1, o2, info = null) {
        let v1 = this.findVertex(o1)
        let v2 = this.findVertex(o2)

        // 两个顶点必须都存在才可以添加边
        if (v1 === undefined || v2 === undefined) {
            return false
        }

        // 检查该边是否存在
        let arc = this.findArc(o1, o2)

        // 不存在：添加边
        if (arc === undefined) {
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
     * 检查顶点是否存在
     *
     * @param {*} data 顶点数据
     * @returns 存在true/不存在false
     * @memberof DirectedGraph
     */
    hasVertex(data) {
        const ret = this.findVertex(data)
        return (ret !== undefined ? true : false)
    }

    /**
     * 查找顶点
     *
     * @param {*} data 顶点数据
     * @returns 顶点/undefined
     * @memberof DirectedGraph
     */
    findVertex(data) {
        if (this.vertexCount === 0) return undefined

        return this.__vertexes.find(v=>{
            return this.__comparator(v.data, data)
        })
    }

    /**
     * 检查边是否存在
     *
     * @param {*} o1 顶点数据1
     * @param {*} o2 顶点数据2
     * @returns 存在true/不存在false
     * @memberof DirectedGraph
     */
    hasArc(o1, o2) {
        const ret = this.findVertex(o1, o2)
        return (ret !== undefined ? true : false)
    }

    /**
     * 查找边
     *
     * @param {*} o1 顶点数据1
     * @param {*} o2 顶点数据2
     * @returns 边/undefined
     * @memberof DirectedGraph
     */
    findArc(o1, o2) {
        if (this.arcCount === 0) return undefined

        return this.__arcs.find(arc=>{
            return (this.__comparator(arc.start.data, o1) && this.__comparator(arc.end.data, o2))
        })
    }

    breadthFirstTraverse(vStart) {
        
    }

    depthFirstTraverse(vStart) {

    }
}

class VertexNode {
    constructor(data) {
        this.data = data
        this.firstIn = null     // Arc
        this.firstOut = null    // Arc
    }
}

class Arc {
    constructor(start, end, info = null) {
        this.start = start      // VertexNode
        this.end = end          // VertexNode
        this.nextIn = null      // Arc
        this.nextOut = null     // Arc
        this.info = info        // Weight info etc.
    }
}