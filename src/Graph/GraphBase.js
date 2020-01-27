/**
 * Copyright (c) 2020
 * License MIT
 *
 * base class for graph
 * 
 * @summary base class for graph
 * @author CoderMonkey <maonianyou@gmail.com>
 * 
 * Created at     : 2020-01-25 00:00:00 
 * Last modified  : 2020-01-27 16:26:31
 */
import {
    eqComparer
} from '../common/toollib.js'

/**
 * @description 图的基类
 *
 * @export GraphBase
 * @class GraphBase
 */
export class GraphBase {
    constructor(customizedComparer = null) {
        this.__comparator = eqComparer(customizedComparer)
        this.__vertexes = []
        this.__arcs = []
    }
    
    /**
     * 顶点个数
     *
     * @readonly
     * @memberof GraphBase
     */
    get vertexCount() {
        return this.__vertexes.length
    }

    /**
     * 边的条数
     *
     * @readonly
     * @memberof GraphBase
     */
    get arcCount() {
        return this.__arcs.length
    }

    /**
     * @description 初始化所以顶点的探索状态
     *
     * @returns Map
     * @memberof UndirectedGraph
     */
    __initVisitStatus() {
        let map = new Map()
        this.__vertexes.forEach(v => {
            map.set(v, VisitStatus.INIT)
        })
        return map
    }

    /**
     * @description 查找顶点
     *
     * @param {*} data 顶点数据
     * @returns 顶点/undefined
     * @memberof DirectedGraph
     */
    __findVertex(data) {
        if (this.vertexCount === 0) return undefined

        return this.__vertexes.find(v => {
            return this.__comparator(v.data, data)
        })
    }

}

export const VisitStatus = {
    INIT: 'Init',
    DISCOVERED: 'Discovered',
    VISITED: 'Visited',
}
