import { TreeNode } from './interface'

/**
 * 给你两颗二叉树 `root1` 和 `root2`，将这两棵树合并成一棵新二叉树
 *
 * 合并规则如下：
 *
 * 如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值
 *
 * 否则，不为 null 的节点将直接作为新二叉树的节点
 *
 * @param root1 给定二叉树根节点 `root1`
 *
 * @param root2 给定二叉树根节点 `root2`
 *
 * @returns 使用 `深度优先搜索` 方式合并后新的二叉树
 */
export function mergeTwoTreeDFS(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    if (root1 === null || root2 === null) {
        return root1 || root2
    }

    return {
        val: root1.val + root2.val,
        left: mergeTwoTreeDFS(root1.left, root2.left),
        right: mergeTwoTreeDFS(root1.right, root2.right)
    }
}

/**
 * 给你两颗二叉树 `root1` 和 `root2`，将这两棵树合并成一棵新二叉树
 *
 * 合并规则如下：
 *
 * 如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值
 *
 * 否则，不为 null 的节点将直接作为新二叉树的节点
 *
 * @param root1 给定二叉树根节点 `root1`
 *
 * @param root2 给定二叉树根节点 `root2`
 *
 * @returns 使用 `广度优先搜索` 方式合并后新的二叉树
 */
export function mergeTwoTreeBFS(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
    if (root1 === null || root2 === null) {
        return root1 || root2
    }

    const newTreeNode = (): TreeNode => ({
        val: 0,
        left: null,
        right: null
    })
    const result: TreeNode = newTreeNode()

    for (let stack: TreeNode[][] = [[root1, root2, result]]; stack.length > 0;) {
        let nextLevelStack: TreeNode[][] = []

        for (let idx = 0, len = stack.length; idx < len; idx++) {
            const [node1, node2, resultNode] = stack[idx]

            const { left: left1, right: right1 } = node1
            const { left: left2, right: right2 } = node2

            resultNode.val = node1.val + node2.val

            if (left1 === null || left2 === null) {
                resultNode.left = left1 || left2
            } else {
                resultNode.left = newTreeNode()
                nextLevelStack.push([left1, left2, resultNode.left])
            }

            if (right1 === null || right2 === null) {
                resultNode.right = right1 || right2
            } else {
                resultNode.right = newTreeNode()
                nextLevelStack.push([right1, right2, resultNode.right])
            }
        }

        stack = nextLevelStack
        nextLevelStack = null
    }

    return result
}
