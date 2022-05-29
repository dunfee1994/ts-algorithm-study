interface Result {
    char: string
    count: number
}

// 通过 跳步 方式找出连续字符及其出现次数
export default function findContinuousCharByHop(str: string = ''): Result {
    const result = {
        char: '',
        count: 0
    }

    const len = str.length

    let tempCount = 0

    for (let i = 0; i < len; i++) {
        tempCount = 0

        for (let j = i; j < len; j++) {
            if (str[i] === str[j]) {
                tempCount++
            }

            if (str[i] !== str[j] || j === len - 1) {
                if (result.count < tempCount) {
                    result.count = tempCount
                    result.char = str[i]
                }

                if (i < len - 1) {
                    i = j - 1
                }

                break
            }
        }
    }

    return result
}
