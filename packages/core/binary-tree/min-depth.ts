import { TreeNode } from './interface'

// 二叉树的最小深度 - 深度优先（递归）
export function minDepthDFSRecursion(root: TreeNode | null): number {
    if (root === null) return 0

    if (root.left === null && root.right === null) {
        return 1
    }

    let depth = Number.MAX_SAFE_INTEGER

    if (root.left !== null) {
        depth = Math.min(depth, minDepthDFSRecursion(root.left))
    }

    if (root.right !== null) {
        depth = Math.min(depth, minDepthDFSRecursion(root.right))
    }

    return depth + 1
}

// 二叉树的最小深度 - 深度优先（循环栈）
export function minDepthDFSStack(root: TreeNode | null): number {
    if (root === null) return 0

    const depthStack: number[] = [1]
    const nodeStack: TreeNode[] = [root]

    let minDepth = Number.MAX_SAFE_INTEGER

    while (nodeStack.length > 0) {
        const depth = depthStack.pop()
        const curNode = nodeStack.pop()

        if (curNode.left === null && curNode.right === null) {
            minDepth = Math.min(minDepth, depth)
            continue
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

    return minDepth
}

// 二叉树的最小深度 - 广度优先
export function minDepthBFS(root: TreeNode | null): number {
    if (root === null) return 0

    const depthStack: number[] = [1]
    const nodeStack: TreeNode[] = [root]

    for (let idx = 0; idx < nodeStack.length; idx++) {
        const depth = depthStack[idx]
        const curNode = nodeStack[idx]

        if (curNode.left === null && curNode.right === null) {
            return depth
        }

        if (curNode.right !== null) {
            nodeStack.push(curNode.right)
            depthStack.push(depth + 1)
        }

        if (curNode.left !== null) {
            nodeStack.push(curNode.left)
            depthStack.push(depth + 1)
        }
    }

    return 0
}

// 二叉树的最小深度 - 层序遍历
export function minDepthLevelOrder(root: TreeNode | null): number {
    if (root === null) return 0

    let curLevelNodeStack: TreeNode[] = [root]

    for (let depth = 0; curLevelNodeStack.length > 0; depth++) {
        const nextLevelNodeStack: TreeNode[] = []

        for (let idx = 0, len = curLevelNodeStack.length; idx < len; idx++) {
            const curNode = curLevelNodeStack[idx]

            if (curNode.left === null && curNode.right === null) {
                return depth + 1
            }

            if (curNode.left !== null) {
                nextLevelNodeStack.push(curNode.left)
            }

            if (curNode.right !== null) {
                nextLevelNodeStack.push(curNode.right)
            }
        }

        curLevelNodeStack = nextLevelNodeStack
    }

    return 0
}
