/**
 * 给你一个整数数组 nums 和一个整数 k，
 * 判断数组中是否存在两个不同的索引 i 和 j，
 * 满足 nums[i] == nums[j] 且 abs(i - j) <= k。
 *
 * @param {number[]} nums 给定整数数组 nums
 *
 * @param {number} k 给定整数 k
 *
 * @returns {boolean} 如果存在，返回 true ；否则，返回 false
 */
export function containsNearbyDuplicateSet(nums: number[], k: number): boolean {
    const set = new Set()

    for (let i = 0, len = nums.length; i < len; i++) {
        if (i > k) {
            set.delete(nums[i - k - 1])
        }

        if (set.has(nums[i])) {
            return true
        }

        set.add(nums[i])
    }

    return false
}

export function containsNearbyDuplicateMap(nums: number[], k: number): boolean {
    const map = new Map()

    for (let i = 0, len = nums.length; i < len; i++) {
        const num = nums[i]

        if (map.has(num) && i - map.get(num) <= k) {
            return true
        }

        map.set(num, i)
    }

    return false
}
