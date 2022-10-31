/**
 * 二分法查找（循环）
 *
 * @param {number[]} nums
 * @param {number} n
 *
 * @returns {number} 找到就返回其所在下标，否则返回 -1
 */
export default function binarySearchCycle(nums: number[] = [], n?: number): number {
    if (nums.length === 0 || isNaN(+n)) return -1

    let leftIndex = 0
    let rightIndex = nums.length - 1

    while (leftIndex <= rightIndex) {
        const midIndex = (leftIndex + rightIndex) / 2 >>> 0
        const midValue = nums[midIndex]

        if (midValue < n) {
            leftIndex = midIndex + 1
        } else if (midValue > n) {
            rightIndex = midIndex - 1
        } else {
            return midIndex
        }
    }

    return -1
}
