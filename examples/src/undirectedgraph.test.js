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
    
    // 添加无向图的边
    udgraph.setArc(vA, vB)
    udgraph.setArc(vA, vC)
    udgraph.setArc(vA, vD)
    udgraph.setArc(vB, vC)
    udgraph.setArc(vB, vE)
    udgraph.setArc(vC, vD)
    udgraph.setArc(vC, vE)
    udgraph.setArc(vC, vF)
    udgraph.setArc(vD, vF)
    udgraph.setArc(vE, vF)

    // 打印构建出的有向图信息
    console.log(udgraph.toString())

    // 广度优先遍历
    console.log('Breath First Search 01 : ')
    udgraph.bfsTraverse(vF, vTraverseFunc)
    console.log('Breath First Search 02 : ')
    udgraph.bfsTraverse(vTraverseFunc)
    console.log('Breath First Search 03: ')
    udgraph.bfsTraverse(null, vTraverseFunc)
}

module.exports = testUndirectedGraph