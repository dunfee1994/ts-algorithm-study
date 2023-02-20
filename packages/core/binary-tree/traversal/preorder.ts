import { TreeNode } from '../interface'

// 二叉树的前序遍历 - 递归
export function preorderTraversalRecursion(root: TreeNode | null): number[] {
    if (root === null) return []

    const res: number[] = []

    function loop(curNode: TreeNode) {
        res.push(curNode.val)

        if (curNode.left !== null) {
            loop(curNode.left)
        }
        if (curNode.right !== null) {
            loop(curNode.right)
        }
    }

    loop(root)

    return res
}

// 二叉树的前序遍历 - 栈
export function preorderTraversalStack(root: TreeNode | null): number[] {
    if (root === null) return []

    const res: number[] = []
    const stack: Array<TreeNode | null> = [root]

    while (stack.length > 0) {
        const curNode = stack.pop()

        res.push(curNode.val)

        if (curNode.right !== null) {
            stack.push(curNode.right)
        }
        if (curNode.left !== null) {
            stack.push(curNode.left)
        }
    }

    return res
}
