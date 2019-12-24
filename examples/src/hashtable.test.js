import HashTable from '../../lib/HashTable/HashTable'

export default function testHashTable() {

    console.log('----------Test: HashTable----------')

    class Singer {
        constructor(firstName, lastName = '', gender = 'male') {
            if (!firstName || !firstName.toString().trim()) throw new Error('Empty Name!')
            this.__firstName = firstName
            this.__lastName = lastName
            this.__gender = gender
            this.works = []

            this.toString = function () {
                return (`[${this.fullName}]\r\n   + ${this.works.join('\r\n   + ')}`)
            }
        }

        get firstName() {
            return this.__firstName
        }
        get lastName() {
            return this.__lastName
        }
        get gender() {
            return this.__gender
        }
        get fullName() {
            return `${this.firstName}${this.lastName ? ' ' + this.lastName : ''}`
        }

        sing(song = 'abc') {
            console.log(`${this.fullName} is singing ${song}`)
        }

        publish(song) {
            if (this.works.includes(song)) return
            this.works.push(song)
        }
    }

    const BobDylan = new Singer('Bob', 'Dylan')
    const Lenka = new Singer('Lenka', '', 'female')

    let hashTable = new HashTable()

    // 0.空HashTable
    console.log(`Size: ${hashTable.size}`)
    console.log(`空HashTable:\r\n${hashTable}`)
    console.log(`空HashTable:`, hashTable)
    console.log(`--> 以上两种 log 方式，打印内容是有区别的`)

    // 1.添加数据
    console.log(`1. Put element into HashTable`)
    hashTable.put('BobDylan', BobDylan)
    hashTable.put('Lenka', Lenka)
    console.log(hashTable)

    // 2.修改数据
    console.log(`2. Update element of HashTable`)
    Lenka.publish('The Show')
    Lenka.publish('Trouble is a friend')
    hashTable.put('Lenka', Lenka)
    console.log(`${hashTable}`)

    // 3.删除数据
    console.log(`3. Delete element of HashTable`)
    hashTable.delete('BobDylan')
    console.log(hashTable)

    // 4.扩容测试
    console.log(`4. Expand capacity of HashTable (Temporarily change MIN_LIMIT to 3)`)
    const AvrilLavign = new Singer('Avril', 'Lavign','female')
    const TalyorSwift = new Singer('Talyor', 'Swift','female')
    const JohnLennon = new Singer('John', 'Lennon','male')

    hashTable.put('AvrilLavign', AvrilLavign)
    hashTable.put('TalyorSwift', TalyorSwift)
    hashTable.put('JohnLennon', JohnLennon)
    // Triggered! resize to 7

    // 5.缩容测试
    console.log(`5. Reduce capacity of HashTable (Temporarily change MIN_LIMIT to 3)`)
    hashTable.delete('AvrilLavign')
    hashTable.delete('TalyorSwift')
    hashTable.delete('JohnLennon')
    // Triggered! resize to 3

    console.log(hashTable)
}