// ---------------------------------------------
// binary to decimal
// ---------------------------------------------
function dec2bin(decNum) {
    if (!decNum) return 0

    var stack = new Stack()
    var temp
    var minus = decNum < 0

    if (minus) {
        decNum *= -1
        while (decNum) {
            var temp = decNum % 2
            switch (temp) {
                case 0:
                    temp = 1
                    break
                case 1:
                    temp = 0
                    break
            }
            stack.push(temp)
            decNum = parseInt(decNum / 2)
        }
    } else {
        while (decNum) {
            stack.push(decNum % 2)
            decNum = parseInt(decNum / 2)
        }
    }

    var result = ''
    while (!stack.isEmpty()) {
        result += stack.pop()
    }

    if (minus) {
        // 补码
        for (var i = result.length - 1; i >= 0; i--) {
            var arrTemp = result.split('')
            switch (result[i]) {
                case '0':
                    arrTemp[i] = 1
                    break
                case '1':
                    arrTemp[i] = 0
                    break
            }
            result = arrTemp.join('')
        }
        result = '1' + result
    }

    return result
}