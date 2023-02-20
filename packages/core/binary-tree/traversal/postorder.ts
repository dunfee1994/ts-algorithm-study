import { TreeNode } from '../interface'

// 二叉树的后序遍历 - 递归
export function postorderTraversalRecursion(root: TreeNode | null): number[] {
    if (root === null) return []

    const res: number[] = []

    function loop(curNode: TreeNode) {
        if (curNode.left !== null) {
            loop(curNode.left)
        }
        if (curNode.right !== null) {
            loop(curNode.right)
        }

        res.push(curNode.val)
    }

    loop(root)

    return res
}

// 二叉树的后序遍历 - 栈
export function postorderTraversalStack(root: TreeNode | null): number[] {
    if (root === null) return []

    const res: number[] = []
    const stack: Array<TreeNode | null> = [root]

    while (stack.length > 0) {
        const curNode = stack.pop()

        res.push(curNode.val)

        if (curNode.left !== null) {
            stack.push(curNode.left)
        }
        if (curNode.right !== null) {
            stack.push(curNode.right)
        }
    }

    return res.reverse()
}
