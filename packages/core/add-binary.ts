function handleStr(str: string, maxLen: number): string {
    return str.length === maxLen ? str : str.padStart(maxLen, '0')
}

/**
 * 给你两个二进制字符串 stra 和 strb，以二进制字符串的形式返回它们的和。
 * 
 * @param {string} stra 二进制字符串 stra
 * @param {string} strb 二进制字符串 strb
 *
 * @returns {string} 二进制字符串的形式的和
 */
export default function addBinary(stra: string, strb: string) {
    const maxLen = Math.max(stra.length, strb.length)

    stra = handleStr(stra, maxLen)
    strb = handleStr(strb, maxLen)

    let res = ''
    let sign = 0
    for (let i = maxLen - 1; i >= 0; i--) {
        const numa = +stra[i]
        const numb = +strb[i]

        res = (numa ^ numb ^ sign) + res
        sign = numa + numb + sign > 1 ? 1 : 0
    }

    return sign === 0 ? res : sign + res
}
