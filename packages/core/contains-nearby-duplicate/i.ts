/**
 * 给你一个整数数组 nums，
 * 判断数组中是否存在出现至少两次的值。
 *
 * @param {number[]} nums 给定整数数组 nums
 *
 * @returns {boolean} 如果存在，返回 true ；否则，返回 false
 */
export function containsDuplicateSet(nums: number[]): boolean {
    return new Set(nums).size !== nums.length
}

export function containsDuplicateMap(nums: number[]): boolean {
    const map = new Map<number, boolean>()

    for (let i = 0, len = nums.length; i < len; i++) {
        if (map.has(nums[i])) {
            return true
        }

        map.set(nums[i], true)
    }

    return false
}
