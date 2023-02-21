import { TreeNode } from './interface'

/**
 * 判断二叉树是否存在从根节点至叶子结点的路径上所有节点值之和等于目标和
 *
 * 方式一：深度优先
 *
 * @param root 二叉树根节点
 *
 * @param targetSum 目标和
 * 
 * @returns {boolean} 如果存在则返回 true，否则返回 false
 */
export function hasPathSumRecursion(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) return false

    return function loop(node: TreeNode, target: number): boolean {
        const { val, left, right } = node

        if (val === target && left === null && right === null) {
            return true
        }

        if (left !== null && loop(left, target - val)) {
            return true
        }

        if (right !== null && loop(right, target - val)) {
            return true
        }

        return false
    }(root, targetSum)
}

/**
 * 方式二：广度优先
 *
 * @param root 二叉树根节点
 *
 * @param targetSum 目标和
 * 
 * @returns {boolean} 如果存在则返回 true，否则返回 false
 */
export function hasPathSumStack(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) return false

    const nodeStack: TreeNode[] = [root]
    const targetStack: number[] = [targetSum]

    while (nodeStack.length > 0) {
        const target = targetStack.pop()
        const { val, left, right } = nodeStack.pop()

        if (val === target && left === null && right === null) {
            return true
        }

        if (right !== null) {
            nodeStack.push(right)
            targetStack.push(target - val)
        }

        if (left !== null) {
            nodeStack.push(left)
            targetStack.push(target - val)
        }
    }

    return false
}
