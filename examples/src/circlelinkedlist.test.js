const { CircleLinkedList } = require('data-struct-js')

function testCircleLinkedList() {

    console.log('----------Test: CircleLinkedList----------')

    let lst = new CircleLinkedList()

    console.log(`0. Head of empty list:\r\n  ${lst.head}`)

    // 添加元素
    lst.append(1)
    lst.append(2)
    lst.append(3)
    lst.append(5)

    console.log(`1. Append \r\n ${lst.toString()}`)

    // 插入元素
    lst.insert(0, 0)
    lst.insert(4, 4)
    lst.insert(6, 6)

    console.log(`2. Insert \r\n ${lst.toString()}`)

    // 移除元素
    lst.remove(6)

    console.log(`3. Remove No.6 element \r\n ${lst.toString()}`)

    // 获取元素数据
    let data4 = lst.findAt(4)

    console.log(`4. Get No.4 element \r\n ${data4}`)

    // 更新元素数据
    lst.update(4, 44)

    console.log(`5. Update No.4 element \r\n ${lst.toString()}`)

    // 获取下标
    let index = lst.indexOf(44)

    console.log(`6. Get index of No.4 element \r\n ${index}`)

    let firstActivity = lst.head

    console.log(`7. Get first element \r\n ${firstActivity}`)

    let lastActivity = lst.tail

    console.log(`8. Get last element \r\n ${lastActivity}`)

    // loop~
    let circle = new CircleLinkedList()
    circle.append("1.Plan")
    circle.append("2.Do")
    circle.append("3.Check")
    circle.append("4.Action")
    for (let i = 0; i < 5; i++) {
        const item = circle.getNext()
        console.log(`${i} : ${item}`)
    }
    for (let j = 0; j < 8; j++) {
        const item = circle.getNext()
        console.log(`${j} : ${item}`)
    }
}

module.exports = testCircleLinkedList