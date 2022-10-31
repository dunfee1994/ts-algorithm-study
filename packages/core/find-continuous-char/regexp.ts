interface Result {
    char: string
    count: number
}

// 通过 正则表达式 方式找出连续字符及其出现次数
export default function findContinuousCharByRegexp(str: string = ''): Result {
    const result: Result = {
        char: '',
        count: 0
    }

    const reg = /(.)\1+/g
    const matches = str.match(reg)

    if (matches === null) return result

    for (let i = 0, len = matches.length; i < len; i++) {
        const _str = matches[i]

        if (result.count < _str.length) {
            result.count = _str.length
            result.char = _str[0]
        }
    }

    return result
}
