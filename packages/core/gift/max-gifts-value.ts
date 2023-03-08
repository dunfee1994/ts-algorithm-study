/**
 * 在一个 m * n 的棋盘的每一格都放有一个礼物，
 * 每个礼物都有一定的价值（价值大于 0）。
 *
 * 你可以从棋盘的左上角开始拿格子里的礼物，
 * 并每次向右或者向下移动一格，直到到达棋盘的右下角。
 *
 * 给定一个棋盘及其上面的礼物的价值，
 * 请计算你最多能拿到多少价值的礼物？
 *
 * @param {number[][]} grid 每格都放有礼物的棋盘
 *
 * @returns {number} 最多能拿到的礼物价值
 */
export default function maxGiftsValue(grid: number[][]): number {
    const maxI = grid.length - 1
    const maxJ = grid[0].length - 1

    for (let i = maxI; i >= 0; i--) {
        const bool = i + 1 <= maxI

        for (let j = maxJ; j >= 0; j--) {
            let max = 0

            if (bool) {
                max = Math.max(max, grid[i + 1][j])
            }

            if (j + 1 <= maxJ) {
                max = Math.max(max, grid[i][j + 1])
            }

            grid[i][j] += max
        }
    }

    return grid[0][0]
}
