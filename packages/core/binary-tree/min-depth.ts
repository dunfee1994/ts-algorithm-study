import { TreeNode } from './interface'

// 二叉树的最小深度 - 深度优先
export function minDepthRecursion(root: TreeNode | null): number {
    if (root === null) return 0

    if (root.left === null && root.right === null) {
        return 1
    }

    let depth = Number.MAX_SAFE_INTEGER
    if (root.left !== null) {
        depth = Math.min(depth, minDepthRecursion(root.left))
    }
    if (root.right !== null) {
        depth = Math.min(depth, minDepthRecursion(root.right))
    }

    return depth + 1
}

// 二叉树的最小深度 - 广度优先
export function minDepthStack(root: TreeNode | null): number {
    if (root === null) return 1

    const depthStack: number[] = [1]
    const nodeStack: TreeNode[] = [root]

    while (nodeStack.length > 0) {
        const depth = depthStack.shift()
        const curNode = nodeStack.shift()

        if (curNode.left === null && curNode.right === null) {
            return depth
        }

        if (curNode.left !== null) {
            nodeStack.push(curNode.left)
            depthStack.push(depth + 1)
        }

        if (curNode.right !== null) {
            nodeStack.push(curNode.right)
            depthStack.push(depth + 1)
        }
    }

    return 0
}
