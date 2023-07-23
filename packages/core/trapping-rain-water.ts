/**
 * 给定 `n` 个非负整数表示每个宽度为 `1` 的柱子的高度图
 *
 * 计算按此排列的柱子，下雨之后能接多少雨水
 *
 * @param {number[]} heights 柱子的高度图
 *
 * @returns {number} 能接到的雨水量
 */
export default function trappingRainWater(heights: number[]): number {
    const n = heights.length
    if (n <= 3) return 0

    const maxLeft = Array<number>(n).fill(heights[0])
    for (let i = 1; i < n; i++) {
        maxLeft[i] = Math.max(heights[i], maxLeft[i - 1])
    }

    const maxRight = Array<number>(n).fill(heights[n - 1])
    for (let i = n - 2; i >= 0; i--) {
        maxRight[i] = Math.max(heights[i], maxRight[i + 1])
    }

    let result = 0
    for (let i = 1; i < n; i++) {
        result += Math.min(maxLeft[i], maxRight[i]) - heights[i]
    }
    return result
}
