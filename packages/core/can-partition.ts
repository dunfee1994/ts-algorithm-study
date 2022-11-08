// 求和
function getSum(nums: number[]): number {
    return nums.reduce((pre, cur) => pre + cur, 0)
}

/**
 * 判断数值数组 nums 是否可以拆分成两个和相等的子数组（一维数组滚动）
 *
 * @param {number[]} nums 数值数组
 *
 * @returns {boolean} 可以拆分返回 true，否则返回 false
 */
export function canPartitionOne(nums: number[]): boolean {
    const sum = getSum(nums)
    if ((sum & 1) !== 0) return false

    const halfSum = sum >> 1
    const numsCount = nums.length
    const dp: boolean[] = Array(halfSum + 1).fill(false)

    for (let i = 0; i < numsCount; i++) {
        const num = nums[i]

        for (let j = halfSum; j >= num; j--) {
            dp[j] = j === num || dp[j] || dp[j - num]
        }
    }

    return dp[halfSum]
}

/**
 * 判断数值数组 nums 是否可以拆分成两个和相等的子数组（二维数组）
 *
 * @param {number[]} nums 数值数组
 *
 * @returns {boolean} 可以拆分返回 true，否则返回 false
 */
export function canPartitionTwo(nums: number[]): boolean {
    const numsCount = nums.length
    if (numsCount === 0) return false

    const sum = getSum(nums)
    if ((sum & 1) !== 0) return false

    const halfSum = sum >> 1
    const dp: boolean[][] = Array(numsCount).fill(null).map(
        () => Array(halfSum + 1).fill(false)
    )

    const [firstNum] = nums
    for (let j = 1; j <= halfSum; j++) {
        dp[0][j] = firstNum === j
    }

    for (let i = 1; i < numsCount; i++) {
        const num = nums[i]

        for (let j = 0; j <= halfSum; j++) {
            const bool = dp[i - 1][j]

            if (j < num) {
                dp[i][j] = bool
            } else {
                dp[i][j] = bool || dp[i - 1][j - num]
            }
        }
    }

    return dp[numsCount - 1][halfSum]
}
