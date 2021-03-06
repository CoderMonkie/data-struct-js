const { DoublyLinkedList } = require('data-struct-js')

function testDoublyLinkedList() {

    console.log('----------Test: DoublyLinkedList----------')

    /**
     * SDLC consists of following activities:
     *  1. Planning
     *  2. Implementation
     *  3. Testing
     *  4. Documentation
     *  5. Deployment and maintenance
     *  6. Maintaining
     */

    class Activity {
        constructor(step, activity) {
            this.step = step
            this.activity = activity
            this.toString = function () {
                return `{Step: ${this.step} Activity: ${this.activity}}`
            }
        }

        static comparer(x, y) {
            if (!x instanceof Activity || !y instanceof Activity) throw ("Not the instance of Activity")
            return x.step === y.step && x.activity === y.activity
        }
    }

    let activity0 = new Activity(0, 'Marketing and research') // #
    let activity1 = new Activity(1, 'Planning')
    let activity2 = new Activity(2, 'Implementation')
    let activity3 = new Activity(3, 'Testing')
    let activity4 = new Activity(4, 'Documentation')
    let activity5 = new Activity(5, 'Deployment and maintenance')
    let activity6 = new Activity(6, 'Maintaining')

    let lst = new DoublyLinkedList(Activity.comparer)

    // 添加元素
    lst.append(activity1)
    lst.append(activity2)
    lst.append(activity3)
    lst.append(activity5)

    console.log(`1. Append \r\n ${lst.toString()}`)

    // 插入元素
    lst.insert(0, activity0)
    lst.insert(4, activity4)
    lst.insert(6, activity6)

    console.log(`2. Insert \r\n ${lst.toString()}`)

    // 移除元素
    lst.remove(activity6)

    console.log(`3. Remove No.6 element \r\n ${lst.toString()}`)

    // 获取元素数据
    let data2 = lst.findAt(2)
    let data5 = lst.findAt(5)

    console.log(`4. Get element by index \r\n index-2: ${data2} \r\n index-5: ${data5}`)

    // 更新元素数据
    let data4 = lst.findAt(4)
    data4.activity = "Documentation and manual"
    lst.update(4, data4)

    console.log(`5. Update No.4 element \r\n ${lst.toString()}`)

    // 获取下标
    let index = lst.indexOf(data4)

    console.log(`6. Get index of No.4 element \r\n ${index}`)

    let firstActivity = lst.head

    console.log(`7. Get first element \r\n ${firstActivity}`)

    let lastActivity = lst.tail

    console.log(`8. Get last element \r\n ${lastActivity}`)

    // 双向遍历
    console.log(`9. Traverse: \r\n`)
    const traverseCb = function (element) {
        console.log(`traversing: ${element}`)
    }
    lst.traverse(traverseCb)
    lst.traverse(traverseCb, true)
}

module.exports = testDoublyLinkedList