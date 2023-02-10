/**
 * 获取 n 个骰子所有点数和的概率分布情况
 *
 * 返回值结构：Array<[点数和, 该点数和可能出现的概率]>
 */
export function findNDicePointSumDistributed(n: number) {
    if (n === 0) {
        throw new Error('The parameter `n` must be a positive integer greater than 0!')
    }

    const faces = 6
    const points = faces * n

    const dp = Array(n + 1).fill(null).map(
        () => Array(points + 1).fill(0)
    )

    for (let f = n; f <= faces; f++) {
        dp[0][f] = 1
    }

    for (let i = 1; i < n; i++) {
        for (let p = i * faces; p >= i; p--) {
            for (let f = faces; f >= 0; f--) {
                dp[i][p + f] += dp[i - 1][p]
            }
        }
    }

    const res: number[][] = []
    const total = Math.pow(faces, n)
    for (let p = n; p <= points; p++) {
        res.push([p, dp[n - 1][p] / total])
    }

    return res
}
