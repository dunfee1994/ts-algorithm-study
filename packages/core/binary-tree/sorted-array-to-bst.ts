import { TreeNode } from './interface'

// 将有序数组转换为二叉搜索树
export default function sortedArrayToBST(nums: number[]): TreeNode | null {
    function useRecursion(nums: number[], left: number, right: number): TreeNode | null {
        if (left > right) return null

        const mid = left + right + 1 >> 1
        return {
            val: nums[mid],
            left: useRecursion(nums, left, mid - 1),
            right: useRecursion(nums, mid + 1, right)
        }
    }

    return useRecursion(nums, 0, nums.length - 1)
}
