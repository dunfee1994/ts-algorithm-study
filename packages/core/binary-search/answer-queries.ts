/**
 * 给你一个长度为 n 的整数数组 nums 和一个长度为 m 的整数数组 queries，
 * 返回一个长度为 m 的数组 answer。
 * 其中 answer[i] 是 nums 中元素之和小于等于 queries[i] 的子序列的最大长度。
 *
 * 提示：
 * 子序列是由一个数组删除某些元素（也可以不删除）但不改变剩余元素顺序得到的一个数组。
 *
 * @param {number[]} nums 长度为 n 的整数数组 nums
 *
 * @param {number[]} queries 长度为 m 的整数数组 queries
 *
 * @returns {number[]} 长度为 m 的数组 answer
 */
export default function answerQueries(nums: number[], queries: number[]): number[] {
    function search(nums: number[], query: number): number {
        let leftIndex = 0
        let rightIndex = nums.length - 1

        while (leftIndex <= rightIndex) {
            const midIndex = leftIndex + (rightIndex - leftIndex >> 1)
            nums[midIndex] > query ? rightIndex = midIndex - 1 : leftIndex = midIndex + 1
        }

        return leftIndex
    }

    function getAnswer(nums: number[], queries: number[]): number[] {
        for (let i = 1, n = nums.length; i < n; i++) {
            nums[i] += nums[i - 1]
        }

        return queries.map(query => search(nums, query))
    }

    return getAnswer(nums.sort((a, b) => a - b), queries)
}
