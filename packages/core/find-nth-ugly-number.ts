/**
 * 获取第 n 个丑数
 * 
 * 提示：
 * 丑数，是指只包含质因子 2、3、5 的数。
 * 质因子（或称素因数），能整除给定正整数的质数。
 * 质数（或称素数），一个大于1的自然数，除了 1 和它自身外，不能被其他自然数整除的数叫做质数。
 *
 * a. 习惯上一般把 1 作为第一个丑数。
 *
 * b. 为什么 2、3、5 是丑数？
 * 2、3、5 的质因子是它们自身。
 * 
 * c. 为什么 8 是丑数？
 * 8 = 2 * 2 * 2，只包含质因子 2，所以它属于丑数。
 *
 * d. 为什么 7 和 14 不是丑数？
 * 7 的质因子是其自身，不包含质因子 2、3、5。而 14 包含质因子 2、7，所以 2、14 不是丑数。
 */
export function findNthUglyNumber(n: number): number {
    if (n === 0) {
        throw new Error('The parameter `n` must be a positive integer greater than 0!')
    }

    if (n === 1) return 1

    const dp = Array(n + 1).fill(1)

    let p2 = 0
    let p3 = 0
    let p5 = 0

    for (let i = 1; i <= n; i++) {
        const v2 = dp[p2] * 2
        const v3 = dp[p3] * 3
        const v5 = dp[p5] * 5
        const min = Math.min(v2, v3, v5)

        if (min === v2) p2++
        if (min === v3) p3++
        if (min === v5) p5++

        dp[i] = min
    }

    return dp[n - 1]
}
