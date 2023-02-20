import { TreeNode } from '../interface'

// 二叉树的中序遍历 - 递归
export function inorderTraversalRecursion(root: TreeNode | null): number[] {
    if (root === null) return []

    const res: number[] = []

    function loop(curNode: TreeNode) {
        if (curNode.left !== null) {
            loop(curNode.left)
        }

        res.push(curNode.val)

        if (curNode.right !== null) {
            loop(curNode.right)
        }
    }

    loop(root)

    return res
}

// 二叉树的中序遍历 - 栈
export function inorderTraversalStack(root: TreeNode | null): number[] {
    if (root === null) return []

    const res: number[] = []
    const stack: Array<TreeNode | null> = []

    let curNode = root
    while (curNode !== null || stack.length > 0) {
        if (curNode !== null) {
            stack.push(curNode)
            curNode = curNode.left
        } else if (curNode = stack.pop()) {
            res.push(curNode.val)
            curNode = curNode.right
        }
    }

    return res
}
