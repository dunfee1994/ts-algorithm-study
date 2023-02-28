/**
 * 编写一个函数，
 * 输入是一个无符号整数 n，
 * 返回其二进制表达式中数字位数为 '1' 的个数。
 *
 * @param {number} n 无符号整数
 *
 * @returns {number} 无符号整数 n 二进制表达式中数字位数为 '1' 的个数
 */
export function hammingWeightOne(n: number): number {
    let ans = 0

    while (n) {
        ans++
        n &= n - 1
    }

    return ans
}

export function hammingWeightTwo(n: number): number {
    let ans = 0

    for (let i = 0; i <= 31; i++) {
        if (((1 << i) & n) !== 0) ans++
    }

    return ans
}
