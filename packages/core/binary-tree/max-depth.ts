import { TreeNode } from './interface'

// 二叉树的最大深度 - 深度优先
export function maxDepthRecursion(root: TreeNode | null): number {
    if (root === null) return 0
    return Math.max(maxDepthRecursion(root.left), maxDepthRecursion(root.right)) + 1
}

// 二叉树的最大深度 - 广度优先
export function maxDepthStack(root: TreeNode | null): number {
    if (root === null) return 0
    
    const stack: Array<TreeNode | null> = [root]

    let depth = 0
    while (stack.length > 0) {
        for (let len = stack.length; len > 0; len--) {
            const node = stack.shift()

            if (node.right !== null) {
                stack.push(node.right)
            }

            if (node.left !== null) {
                stack.push(node.left)
            }
        }

        depth++
    }

    return depth
}
