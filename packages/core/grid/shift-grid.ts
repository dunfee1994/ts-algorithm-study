/**
 * 给你一个 m 行 n 列的二维网格 grid 和一个整数 k。
 * 你需要将二维网格 grid 迁移 k 次。
 *
 * 每次迁移操作将会引发以下活动：
 * 1. 位于 grid[i][j] 的元素将会移动到 grid[i][j + 1] 位置。
 * 2. 位于 grid[i][n - 1] 的元素将会移动到 grid[i + 1][n - 1] 位置
 * 3. 位于 grid[m - 1][n - 1] 的元素将会移动到 grid[0][0] 位置
 * 
 * @param {number[][]} grid 原始二维网格
 *
 * @param {number} k 整数 k
 *
 * @returns {number[][]} 进行 k 次迁移操作后最终得到的二维网格
 */
export function shiftGrid(grid: number[][], k: number): number[][] {
    const m = grid.length - 1
    if (m < 0) return []

    const n = grid[0].length - 1
    if (n < 0) return [[]]

    while (k) {
        for (let i = m; i >= 0; i--) {
            for (let j = n; j > 0; j--) {
                [grid[i][j], grid[i][j - 1]] = [grid[i][j - 1], grid[i][j]]
            }

            if (i > 0) {
                [grid[i][0], grid[i - 1][n]] = [grid[i - 1][n], grid[i][0]]
            }
        }

        k--
    }

    return grid
}

// 优化版
export function shiftGridOptimized(grid: number[][], k: number): number[][] {
    const m = grid.length
    if (m === 0) return []

    const n = grid[0].length
    if (n === 0) return [[]]

    const count = m * n
    const ans = Array(m).fill(null).map(() => Array(n).fill(-1))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const t = (i * n + j + k) % count
            ans[t / n >> 0][t % n] = grid[i][j]
        }
    }

    return ans
}
