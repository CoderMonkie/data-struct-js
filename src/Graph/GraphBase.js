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
 * Last modified  : 2020-01-26 00:49:05
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

}

export const VisitStatus = {
    INIT: 'Init',
    DISCOVERED: 'Discovered',
    VISITED: 'Visited',
}