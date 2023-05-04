import { TreeNode } from './interface'

// 二叉树的最大深度 - 深度优先（递归）
export function maxDepthDFSRecursion(root: TreeNode | null): number {
    if (root === null) return 0
    return Math.max(maxDepthDFSRecursion(root.left), maxDepthDFSRecursion(root.right)) + 1
}

// 二叉树的最大深度 - 深度优先（循环栈）
export function minDepthDFSStack(root: TreeNode | null): number {
    if (root === null) return 0

    const depthStack: number[] = [1]
    const nodeStack: TreeNode[] = [root]

    let maxDepth = 0

    while (nodeStack.length > 0) {
        const depth = depthStack.pop()
        const curNode = nodeStack.pop()

        if (curNode.left === null && curNode.right === null) {
            maxDepth = Math.max(maxDepth, depth)
            continue
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

    return maxDepth
}

// 二叉树的最大深度 - 广度优先
export function maxDepthBFS(root: TreeNode | null): number {
    if (root === null) return 0
    
    const depthStack: number[] = [1]
    const nodeStack: TreeNode[] = [root]

    let maxDepth = 0

    for (let idx = 0; idx < nodeStack.length; idx++) {
        const depth = depthStack[idx]
        const curNode = nodeStack[idx]

        if (curNode.left === null && curNode.right === null) {
            maxDepth = Math.max(maxDepth, depth)
            continue
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

    return maxDepth
}

// 二叉树的最大深度 - 层序遍历
export function maxDepthLevelOrder(root: TreeNode | null): number {
    if (root === null) return 0
    
    let depth = 0
    let curLevelNodeStack: TreeNode[] = [root]
    
    for (; curLevelNodeStack.length > 0; depth++) {
        const nextLevelNodeStack: TreeNode[] = []

        for (let idx = 0, len = curLevelNodeStack.length; idx < len; idx++) {
            const curNode = curLevelNodeStack[idx]

            if (curNode.left !== null) {
                nextLevelNodeStack.push(curNode.left)
            }

            if (curNode.right !== null) {
                nextLevelNodeStack.push(curNode.right)
            }
        }

        curLevelNodeStack = nextLevelNodeStack
    }

    return depth
}
