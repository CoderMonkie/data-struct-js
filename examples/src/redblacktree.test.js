// const { RedBlackTree } = require('data-struct-js')
const { RedBlackTree } = require('../../lib/Tree/RedBlackTree')

function testRedBlackTree() {

    console.log('----------Test: RedBlackTree----------')

    class Student {
        constructor(name, score) {
            this.score = score
            this.name = name

            this.toString = function() {
                return `[Student ${this.name} scored: ${JSON.stringify(this.score)}]`
            }
        }
    }

    const studentA = new Student('A', {math: 66, geography: 77, biology: 88})
    const studentB = new Student('B', {math: 58, geography: 87, biology: 78})
    const studentC = new Student('C', {math: 85, geography: 91, biology: 72})
    const studentD = new Student('D', {math: 79, geography: 81, biology: 83})
    const studentE = new Student('E', {math: 90, geography: 84, biology: 76})
    const studentF = new Student('F', {math: 86, geography: 85, biology: 80})

    const studentTraverseFunc = function (student) {
        console.log(`Traversing: ${student}`)
    }

    const getComparator = function(subject) {
        function comparator(student1, student2) {
            const ret = student1.score[subject] - student2.score[subject]
            if(ret > 0) {
                return 1
            }
            else if(ret < 0) {
                return -1
            }
            return 0
        }
        return comparator
    }

    // let rbTree = new RedBlackTree()
    // rbTree.insert(99)    // => 像存这样的值的话
    // rbTree.insert(88)    // => 无需传入比较方法

    // 红黑树节点上存放的数据，是可比较的，如数值，字符串也有自己的比较方式，
    // 但当存放复杂对象时，需在初始化红黑树时在构造函数中传入比较方法

    let mathTree = new RedBlackTree(getComparator('math'))
    let geoTree = new RedBlackTree(getComparator('geography'))
    let bioTree = new RedBlackTree(getComparator('biology'))

    let tree = new RedBlackTree()
    tree.insert(66);
    tree.insert(58);
    tree.insert(85);
    tree.insert(79);
    tree.insert(90);
    tree.insert(86);
    /**
     *         66
     *    ------------
     *    |          |
     *    58         85-Red
     *           ---------
     *           |       |
     *           79      90
     *                --------
     *                |
     *                86-Red
     */
    mathTree.insert(studentA)
    mathTree.insert(studentB)
    mathTree.insert(studentC)
    mathTree.insert(studentD)
    mathTree.insert(studentE)
    mathTree.insert(studentF)

    console.log(`---- 1. RedBlackTree made by score of Math ----`)
    mathTree.inOrderTraverse(studentTraverseFunc)

    console.log(`The highest score of math => ${mathTree.max.name} : ${mathTree.max.score.math}`)

    // ----------------------------

    tree = new RedBlackTree()
    tree.insert(77)
    tree.insert(87)
    tree.insert(91)
    tree.insert(81)
    tree.insert(84)
    tree.insert(85)
    /**
     *           87
     *      ------------
     *      |          |
     *      81-Red     91
     *  ---------
     *  |        |
     *  77       84
     *        --------
     *               |
     *               85-Red
     */
    geoTree.insert(studentA)
    geoTree.insert(studentB)
    geoTree.insert(studentC)
    geoTree.insert(studentD)
    geoTree.insert(studentE)
    geoTree.insert(studentF)

    console.log(`---- 2. RedBlackTree made by score of Geography ----`)
    geoTree.inOrderTraverse(studentTraverseFunc)

    console.log(`The highest score of geography => ${geoTree.max.name} : ${geoTree.max.score.geography}`)

    // ----------------------------
    tree = new RedBlackTree()
    tree.insert(88)
    tree.insert(78)
    tree.insert(72)
    tree.insert(83)
    tree.insert(76)
    tree.insert(80)
    /**
     *            78
     *     -----------------
     *     |               |
     *     72             83
     *  ------        ----------
     *       |        |        |
     *       76-Red   80-Red   88-Red
     *
     *
     *
     */
    bioTree.insert(studentA)
    bioTree.insert(studentB)
    bioTree.insert(studentC)
    bioTree.insert(studentD)
    bioTree.insert(studentE)
    bioTree.insert(studentF)

    console.log(`---- 3. RedBlackTree made by score of Biology ----`)
    bioTree.inOrderTraverse(studentTraverseFunc)

    console.log(`The highest score of biology => ${bioTree.max.name} : ${bioTree.max.score.biology}`)
}

module.exports = testRedBlackTree