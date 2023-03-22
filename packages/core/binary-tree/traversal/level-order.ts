import { TreeNode } from '../interface'

/**
 * 从上到下打印出二叉树的每个节点，
 * 同一层的节点按照从左到右的顺序打印
 */
export function levelOrderI(root: TreeNode | null): number[] {
    if (root === null) return []

    const stack: TreeNode[] = [root]
    const res: number[] = []

    while (stack.length > 0) {
        const curNode = stack.shift()

        res.push(curNode.val)

        if (curNode.left !== null) {
            stack.push(curNode.left)
        }
        if (curNode.right !== null) {
            stack.push(curNode.right)
        }
    }

    return res
}

/**
 * 从上到下打印出二叉树的每个节点，
 * 同一层的节点按从左到右的顺序打印，每一层打印到一行
 */
export function levelOrderII(root: TreeNode | null): number[][] {
    if (root === null) return []

    const stack: TreeNode[] = [root]
    const res: number[][] = []

    while (stack.length > 0) {
        const tmp: number[] = []

        for (let i = stack.length - 1; i >= 0; i--) {
            const curNode = stack.shift()

            tmp.push(curNode.val)

            if (curNode.left !== null) {
                stack.push(curNode.left)
            }
            if (curNode.right !== null) {
                stack.push(curNode.right)
            }
        }

        res.push(tmp)
    }

    return res
}

/**
 * 请实现一个函数按照之字形顺序打印二叉树，
 * 即第一行按照从左到右的顺序打印，
 * 第二层按照从右到左的顺序打印，
 * 第三行再按照从左到右的顺序打印，
 * 其他行以此类推
 */
export function levelOrderIII(root: TreeNode | null): number[][] {
    if (root === null) return []

    const stack: TreeNode[] = [root]
    const res: number[][] = []

    for (let bool = true; stack.length > 0; bool = !bool) {
        const tmp: number[] = []
        const endI = stack.length - 1

        for (let i = endI; i >= 0; i--) {
            const curNode = stack.shift()

            tmp[bool ? endI - i : i] = curNode.val

            if (curNode.left !== null) {
                stack.push(curNode.left)
            }
            if (curNode.right !== null) {
                stack.push(curNode.right)
            }
        }

        res.push(tmp)
    }

    return res
}
