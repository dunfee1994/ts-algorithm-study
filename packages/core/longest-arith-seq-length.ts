/**
 * 给你一个整数数组 nums，返回 nums 中最长等差子序列的长度
 *
 * 提示：等差子序列不用考虑在原数组中的相对顺序
 *
 * @param {number[]} nums 整数数组
 *
 * @returns {number} 最长等差子序列的长度
 */
export default function longestArithSeqLength(nums: number[]): number {
    const minNum = nums.reduce((pre, cur) => Math.min(pre, cur))
    const maxNum = nums.reduce((pre, cur) => Math.max(pre, cur))

    const length = nums.length
    const diff = maxNum - minNum

    let ans = 1
    for (let d = -diff; d <= diff; d++) {
        const find = Array(maxNum + 1).fill(-1)

        for (let i = 0; i < length; i++) {
            const num = nums[i]
            const preNum = num - d

            if (preNum < minNum || preNum > maxNum || find[preNum] === -1) {
                find[num] = 1
                continue
            }

            find[num] = Math.max(find[num], find[preNum] + 1)
            ans = Math.max(ans, find[num])
        }
    }

    return ans
}
