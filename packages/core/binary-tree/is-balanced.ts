import { TreeNode } from './interface'
import { maxDepthRecursion } from './max-depth'

// 平衡二叉树
export default function isBalancedRecursion(root: TreeNode | null): boolean {
    if (root === null) return true

    const leftDepth = maxDepthRecursion(root.left)
    const rightDepth = maxDepthRecursion(root.right)
    if (Math.abs(leftDepth - rightDepth) > 1) {
        return false
    }

    return isBalancedRecursion(root.left) && isBalancedRecursion(root.right)
}
