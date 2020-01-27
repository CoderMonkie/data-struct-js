/**
 * Copyright (c) 2020
 *
 * MIT
 *
 * example/comfirm for DirectedGraph
 *
 * @summary example/comfirm for DirectedGraph
 * @author CoderMonkey <maonianyou@gmail.com>
 *
 * Created at     : 2020-01-23 22:49:55  
 * Last modified  : 2020-01-27 21:01:56
 */
const { DirectedGraph } = require('../../lib/Graph/DirectedGraph')
// const { DirectedGraph } = require('data-struct-js')

function testDirectedGraph() {

    console.log('----------Test: DirectedGraph----------')

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
    const vJ = new TestVertext('J')

    const vTraverseFunc = function (v) {
        console.log(`Traversing: ${v.toString()}`)
    }

    // -------------------------------------------------

    let dgraph = new DirectedGraph(TestVertext.comparator)

    // 添加顶点
    dgraph.addVertex(vA)
    dgraph.addVertex(vB)
    dgraph.addVertex(vC)
    dgraph.addVertex(vD)
    dgraph.addVertex(vE)
    dgraph.addVertex(vF)
    dgraph.addVertex(vF)
    dgraph.addVertex(vG)
    dgraph.addVertex(vH)
    dgraph.addVertex(vI)
    dgraph.addVertex(vI)
    // 因不可重复，不会添加第11个顶点
    // dgraph.addVertex(vJ) // Not add

    // 添加有向图的边(可以在添加边时添加/使用新的顶点)
    dgraph.setArc(vA, vB)
    dgraph.setArc(vA, vC)
    dgraph.setArc(vA, vD)
    dgraph.setArc(vB, vA)
    dgraph.setArc(vB, vE)
    dgraph.setArc(vB, vF)
    dgraph.setArc(vC, vA)
    dgraph.setArc(vC, vG)
    dgraph.setArc(vD, vH)
    dgraph.setArc(vF, vI)
    dgraph.setArc(vG, vC)
    dgraph.setArc(vH, vD)
    dgraph.setArc(vI, vE)

    // 打印构建出的有向图信息
    console.log(dgraph.toString())

    // ----遍历----

    // 广度优先遍历
    console.log('----Breath First Search 01 : ----')
    dgraph.bfsTraverse(vA, vTraverseFunc)
    console.log('----Breath First Search 02 : ----')
    dgraph.bfsTraverse(vTraverseFunc)
    console.log('----Breath First Search 03: ----')
    dgraph.bfsTraverse(null, vTraverseFunc)

    // 深度优先遍历
    console.log('----Depth First Search 01 : ----')
    dgraph.dfsTraverse(vA, vTraverseFunc)
    console.log('----Depth First Search 02 : ----')
    dgraph.dfsTraverse(vTraverseFunc)
    console.log('----Depth First Search 03: ----')
    dgraph.dfsTraverse(null, vTraverseFunc)

    console.log(`---------------------------`)
    console.log(`Vertex-Count：${dgraph.vertexCount}`)

    // 检查顶点是否存在
    console.log(`A exists: ${dgraph.hasVertex(vA)}`)
    console.log(`J exists: ${dgraph.hasVertex(vJ)}`)

    // 检查边是否存在
    console.log(`B->F: ${dgraph.hasArc(vB, vF)}`)
    console.log(`F->B: ${dgraph.hasArc(vF, vB)}`)

}

module.exports = testDirectedGraph