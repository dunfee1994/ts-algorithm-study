/**
 * 二分法查找（递归）
 *
 * @param {number[]} nums
 * @param {number} n
 *
 * @returns {number} 找到就返回其所在下标，否则返回 -1
 */
export default function binarySearchRecursion(nums: number[] = [], n?: number): number {
    if (nums.length === 0 || isNaN(+n)) return -1

    function _recursion(leftIndex: number, rightIndex: number): number {
        if (leftIndex > rightIndex) return -1

        const midIndex = leftIndex + (rightIndex - leftIndex >> 1)
        const midValue = nums[midIndex]

        let _res: number = -1
        if (midValue < n) {
            _res = _recursion(midIndex + 1, rightIndex)
        } else if (midIndex > n) {
            _res = _recursion(leftIndex, midIndex - 1)
        } else {
            _res = midIndex
        }

        return _res
    }

    return _recursion(0, nums.length - 1)
}
