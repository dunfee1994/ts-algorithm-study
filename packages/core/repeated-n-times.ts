/**
 * 在长度 2N 的数组 nums 中找出重复 N 次的元素
 *
 * nums 有以下特性：
 * nums.length === 2 * n
 * nums 包含 n + 1 个不同的元素
 * nums 中恰有一个元素重复 n 次
 *
 * @param {number[]} nums
 *
 * @returns {number} 重复 N 次的元素
 * 找到就返回该元素，否则就返回 -1
 */
export default function repeatedNTimes(nums: number[]): number {
    const set: Set<number> = new Set()

    for (let i = 0, len = nums.length; i < len; i++) {
        const item = nums[i]
        if (set.has(item)) {
            return item
        }
        set.add(item)
    }

    return -1
}
