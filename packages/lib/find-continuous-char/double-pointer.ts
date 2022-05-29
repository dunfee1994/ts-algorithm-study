interface Result {
    char: string
    count: number
}

// 通过 双指针 方式找出连续字符及其出现次数
export default function findContinuousCharByDoublePointer(str: string = ''): Result {
    const result: Result = {
        char: '',
        count: 0
    }

    const len = str.length

    let i = 0
    let j = 0
    let tempCount = 0

    for (; j < len; j++) {
        if (str[i] === str[j]) {
            tempCount++
        }

        if (str[i] !== str[j] || j === len - 1) {
            if (result.count < tempCount) {
                result.count = tempCount
                result.char = str[i]
            }

            tempCount = 0

            if (j < len - 1) {
                i = j--
            }
        }
    }

    return result
}
