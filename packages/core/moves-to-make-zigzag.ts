/**
 * 递减元素使数组呈锯齿状
 *
 * 给你一个整数数组 nums，每次操作会从中选择一个元素并将该元素的值减少 1。
 *
 * 如果符合下列情况之一，则数组 A 就是锯齿数组：
 * 1. 每个偶数索引对应的元素大于相邻的元素，即 A[0] > A[1] < A[2] > A[3] < A[4] > ...
 * 2. 每个奇数索引对应的元素大于相邻的元素，即 A[0] < A[1] > A[2] < A[3] > A[4] < ...
 * 
 * @param {number[]} nums 给定整数数组
 *
 * @returns {number} 将数组 nums 转换为锯齿数组所需的最小操作次数
 */
export default function movesToMakeZigzag(nums: number[]): number {
    function help(nums: number[], pos: number): number {
        let res = 0

        for (let i = pos, len = nums.length; i < len; i += 2) {
            const curNum = nums[i]

            let temp = 0
            if (i - 1 >= 0) {
                temp = Math.max(temp, curNum - nums[i - 1] + 1)
            }
            if (i + 1 <= len - 1) {
                temp = Math.max(temp, curNum - nums[i + 1] + 1)
            }

            res += temp
        }

        return res
    }

    return Math.min(help(nums, 0), help(nums, 1))
}
