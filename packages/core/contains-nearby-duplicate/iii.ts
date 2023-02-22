/**
 * 给你一个整数数组 nums、一个整数 k 和一个整数 t，
 * 判断数组中是否存在两个不同的索引 i 和 j，
 * 满足 abs(nums[i] - nums[j]) <= t 且 abs(i - j) <= k。
 *
 * @param {number[]} nums 给定整数数组 nums
 *
 * @param {number} k 给定整数 k
 *
 * @param {number} t 给定整数 t
 *
 * @returns {boolean} 如果存在，返回 true ；否则，返回 false
 */
export default function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
    const getBucketKey = (num: number) => Math.floor(num / (t + 1))

    const buckets = new Map<number, number>()
    for (let i = 0, len = nums.length; i < len; i++) {
        const num = nums[i]
        const bucketKey = getBucketKey(num)

        if (buckets.has(bucketKey)) {
            return true
        }

        const preBucketKey = bucketKey - 1
        if (buckets.has(preBucketKey) && Math.abs(num - buckets.get(preBucketKey)) <= t) {
            return true
        }

        const nextBucketKey = bucketKey + 1
        if (buckets.has(nextBucketKey) && Math.abs(num - buckets.get(nextBucketKey)) <= t) {
            return true
        }

        buckets.set(bucketKey, num)
        if (i >= k) {
            buckets.delete(getBucketKey(nums[i - k]))
        }
    }

    return false
}
