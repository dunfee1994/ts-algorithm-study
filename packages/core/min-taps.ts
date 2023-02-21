/**
 * 在 x 轴上有一个一维的花园。花园长度为 n，从点 0 开始，到点 n 结束。
 * 花园里总共有 n + 1 个水龙头，分别位于 [0, 1, ..., n]。
 *
 * 给你一个整数 n 和一个长度为 n + 1 的整数数组 ranges，
 * 其中 ranges[i]（下标从 0 开始）表示：如果打开点 i 处的水龙头，
 * 可以灌溉的区域为 [i -  ranges[i], i + ranges[i]]。
 *
 * 请你返回可以灌溉整个花园的最少水龙头数目。
 * 如果花园始终存在无法灌溉到的地方，请你返回 -1。
 *
 * @param {number} n 花园长度
 * 
 * @param {number[]} ranges 整数数组 ranges
 * 
 * @returns {number} 可以灌溉整个花园的 最少水龙头数目
 */
export default function minTaps(n: number, ranges: number[]): number {
    function generateDp(n: number): number[] {
        const dp = Array(n + 1)

        dp[0] = 0
        dp.fill(Number.MAX_SAFE_INTEGER, 1)

        return dp
    }

    function generateIntervals(n: number, ranges: number[]): [number, number][] {
        const intervals = Array(n + 1).fill(new Array(2))

        for (let i = 0; i <= n; i++) {
            const start = Math.max(0, i - ranges[i])
            const end = Math.min(n, i + ranges[i])

            intervals[i] = [start, end]
        }

        return intervals.sort((a, b) => a[0] - b[0])
    }

    return function (n: number, ranges: number[]): number {
        const dp = generateDp(n)
        const intervals = generateIntervals(n, ranges)

        for (let [start, end] of intervals) {
            if (dp[start] === Number.MAX_SAFE_INTEGER) {
                return -1
            }

            for (let j = start; j <= end; j++) {
                dp[j] = Math.min(dp[j], dp[start] + 1)
            }
        }

        return dp[n]
    }(n, ranges)
}
