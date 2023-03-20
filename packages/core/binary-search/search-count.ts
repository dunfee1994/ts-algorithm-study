/**
 * 统计一个数字在排序数组中出现的次数
 * 
 * @param {number[]} nums 排序数组
 * 
 * @param {number} target 目标数字
 *
 * @returns {number} 目标数字在排序数组中出现的次数
 */
export default function searchCount(nums: number[], target: number): number {
    // 寻找左侧边界
    function getLeftBorder(nums: number[], target: number): number {
        for (let l = 0, r = nums.length - 1; l <= r;) {
            const mid = l + (r - l >> 1)
            const midNum = nums[mid]

            if (target === midNum && target !== nums[mid - 1]) {
                return mid
            }

            target > midNum ? l = mid + 1 : r = mid - 1
        }

        return 0
    }

    // 寻找右侧边界
    function getRightBorder(nums: number[], target: number): number {
        for (let l = 0, r = nums.length - 1; l <= r;) {
            const mid = l + (r - l >> 1)
            const midNum = nums[mid]

            if (target === midNum && target !== nums[mid + 1]) {
                return mid
            }

            target < mid ? r = mid - 1 : l = mid + 1
        }

        return -1
    }

    return getRightBorder(nums, target) - getLeftBorder(nums, target) + 1
}
