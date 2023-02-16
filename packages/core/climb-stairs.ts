/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 *
 * 方式一
 * 
 * @param {number} n 阶梯的级数
 *
 * @returns {number} 多少种不同的方法
 */
export function climbStairsOne(n: number): number {
    if (n <= 2) return n

    const dp = [1, 2]
    for (let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n - 1]
}

/**
 * 方式二
 *
 * @param {number} n 阶梯的级数
 *
 * @returns {number} 多少种不同的方法
 */
export function climbStairsTwo(n: number): number {
    let p = 0
    let q = 0
    let r = 1

    for (let i = 1; i <= n; i++) {
        p = q
        q = r
        r = p + q
    }

    return r
}
