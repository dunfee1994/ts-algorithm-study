/**
 * 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行
 *
 * @param {number} rowIndex 给定的非负索引
 *
 * @returns {number[]} 返回「杨辉三角」的第 rowIndex 行
 */
export default function getRow(rowIndex: number): number[] {
    const dp: number[][] = []
    
    for (let i = 0; i <= rowIndex; i++) {
        const temp: number[] = []

        temp[0] = 1
        i > 0 && (temp[i] = 1)

        for (let j = 1; j < i; j++) {
            temp[j] = dp[i - 1][j - 1] + dp[i - 1][j]
        }

        dp.push(temp)
    }

    return dp[rowIndex]
}
