/**
 * 给你一个正方形矩阵 `grid`，请你返回矩阵对角线元素的和
 *
 * 请你返回在矩阵主对角线上的元素和副对角线上且不在主对角线上元素的和
 *
 * @param 给定正方形矩阵 `grid`
 *
 * @returns 矩阵对角线元素的和
 */
export default function diagonalSum(grid: number[][]): number {
    let result = 0, n = grid.length

    for (let i = 0, endIdx = n - 1; i <= endIdx; i++) {
        result += grid[i][i] + grid[i][endIdx - i]
    }

    if ((n & 1) === 1) {
        n >>= 1
        result -= grid[n][n]
    }

    return result
}
