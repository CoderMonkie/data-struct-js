/*
 * @Date         : 2020-01-23 22:49:55
 * @LastEditors  : Mao NianYou
 * @LastEditTime : 2020-01-25 21:45:08
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
    dgraph.addVertex(vF)    // 因不可重复，不会添加第七个顶点
    // 添加有向图的边
    dgraph.setArc(vA, vB)
    dgraph.setArc(vA, vD)
    dgraph.setArc(vC, vA)
    dgraph.setArc(vC, vD)
    dgraph.setArc(vD, vE)
    dgraph.setArc(vD, vF)
    dgraph.setArc(vE, vB)
    dgraph.setArc(vE, vD)
    dgraph.setArc(vF, vC)
    // 打印构建出的有向图信息
    console.log(dgraph.toString())

    // 遍历
    dgraph.depthFirstTraverse(vF, vTraverseFunc)
}

module.exports = testDirectedGraph