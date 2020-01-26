/**
 * Copyright (c) 2020
 *
 * MIT
 *
 * example/comfirm for UndirectedGraph
 *
 * @summary example/comfirm for UndirectedGraph
 * @author CoderMonkey <maonianyou@gmail.com>
 *
 * Created at     : 2020-01-25 12:17:09 
 * Last modified  : 2020-01-26 19:12:58
 */
const { UndirectedGraph } = require('../../lib/Graph/UndirectedGraph')
// const { UndirectedGraph } = require('data-struct-js')

function testUndirectedGraph() {

    console.log('----------Test: UndirectedGraph----------')

    class TestVertext {
        constructor(name) {
            this.name = name

            this.toString = function() {
                return `{Name: ${this.name}}`
            }
        }

        static comparator(v1, v2) {
            return v1.name === v2.name
        }
    }

    const vA = new TestVertext('A')
    const vB = new TestVertext('B')
    const vC = new TestVertext('C')
    const vD = new TestVertext('D')
    const vE = new TestVertext('E')
    const vF = new TestVertext('F')
    const vG = new TestVertext('G')
    const vH = new TestVertext('H')
    const vI = new TestVertext('I')

    const vTraverseFunc = function (v) {
        console.log(`Traversing: ${v.toString()}`)
    }

    // -------------------------------------------------

    let udgraph = new UndirectedGraph(TestVertext.comparator)

    // 添加顶点
    udgraph.addVertex(vA)
    udgraph.addVertex(vB)
    udgraph.addVertex(vC)
    udgraph.addVertex(vD)
    udgraph.addVertex(vE)
    udgraph.addVertex(vF)
    udgraph.addVertex(vG)
    udgraph.addVertex(vH)
    udgraph.addVertex(vI)
    // 不添加顶点，直接添加边也是可以的
    
    // 添加无向图的边
    udgraph.setArc(vA, vB)
    udgraph.setArc(vA, vC)
    udgraph.setArc(vA, vD)
    udgraph.setArc(vB, vE)
    udgraph.setArc(vB, vF)
    udgraph.setArc(vC, vG)
    udgraph.setArc(vD, vG)
    udgraph.setArc(vD, vH)
    udgraph.setArc(vE, vI)

    // 打印构建出的有向图信息
    console.log(udgraph.toString())

    // 广度优先遍历
    console.log('Breath First Search 01 : ')
    udgraph.bfsTraverse(vA, vTraverseFunc)
    console.log('Breath First Search 02 : ')
    udgraph.bfsTraverse(vTraverseFunc)
    console.log('Breath First Search 03: ')
    udgraph.bfsTraverse(null, vTraverseFunc)

    // 深度优先遍历
    console.log('----Depth First Search 01 : ----')
    udgraph.dfsTraverse(vA, vTraverseFunc)
    console.log('----Depth First Search 02 : ----')
    udgraph.dfsTraverse(vTraverseFunc)
    console.log('----Depth First Search 03: ----')
    udgraph.dfsTraverse(null, vTraverseFunc)
}

module.exports = testUndirectedGraph