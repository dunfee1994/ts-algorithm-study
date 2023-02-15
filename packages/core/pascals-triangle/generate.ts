/**
 * 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行
 *
 * @param {number} rows 给定的非负整数
 *
 * @returns {number[][]} 返回「杨辉三角」的前 numRows 行
 */
export default function generate(rows: number): number[][] {
    const dp = Array(rows).fill(null).map(
        (i, index) => Array(index + 1).fill(1)
    )

    for (let i = 2; i < rows; i++) {
        for (let j = 1; j < i; j++) {
            dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
        }
    }

    return dp
}
