/**
 * 给你一个整数数组 nums，返回其中「按位与三元组」的数目。
 *
 * 按位与三元组是由下标（i，j，k）组成的三元组，并满足下述全部条件：
 * · 0 <= i <= nums.length
 * · 0 <= j <= nums.length
 * · 0 <= k <= nums.length
 * · nums[i] & nums[j] & nums[k] === 0
 *
 * @param {number[]} nums 整数数组
 *
 * @returns {number} 数组中「按位与三元组」的数目
 */
export default function countTriplets(nums: number[]): number {
    const n = 1 << 16
    const cnt = Array(n).fill(0)
    nums.forEach(numa => {
        nums.forEach(numb => cnt[numa & numb]++)
    })

    let res = 0
    nums.forEach(numc => {
        for (let w = 0; w < n; w++) {
            if ((numc & w) === 0) res += cnt[w]
        }
    })
    return res
}
