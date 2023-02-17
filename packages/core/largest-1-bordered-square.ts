function generateDp(w: number, h: number) {
    return Array(h + 1).fill(null).map(() => Array(w + 1).fill(0))
}

function getBorder(dpVertical: number[][], dpHorizontal: number[][], i: number, j: number): number {
    let border = Math.max(dpVertical[i][j], dpHorizontal[i][j])

    while (dpVertical[i][j - border + 1] < border || dpHorizontal[i - border + 1][j] < border) {
        border--
    }

    return border
}

/**
 * 给你一个由若干 0 和 1 组成的二维网格 grid，
 * 请你找出边界全部由 1 组成的最大正方形子网格，
 * 并返回该子网格中的元素数量。
 * 如果不存在，则返回 0。
 * 
 * @param {number[][]} grid 给定的由若干 0 和 1 组成的二维网格
 *
 * @returns {number} 最大正方形子网格中的元素数量
 */
export default function largest1BorderedSquare(grid: number[][]): number {
    const h = grid.length
    const w = grid[0].length

    const dpVertical = generateDp(w, h)
    const dpHorizontal = generateDp(w, h)

    let maxBorder = 0
    for (let i = 1; i <= h; i++) {
        for (let j = 1; j<= w; j++) {
            const preI = i - 1
            const preJ = j - 1

            if (grid[preI][preJ] === 0) continue

            dpVertical[i][j] = dpVertical[preI][j] + 1
            dpHorizontal[i][j] = dpHorizontal[i][preJ] + 1

            const border = getBorder(dpVertical, dpHorizontal, i, j)

            maxBorder = Math.max(maxBorder, border)
        }
    }

    return Math.pow(maxBorder, 2)
}
