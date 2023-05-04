import { TreeNode } from '../interface'

/**
 * 从上到下打印出二叉树的每个节点，
 * 同一层的节点按照从左到右的顺序打印
 */
export function levelOrderI(root: TreeNode | null): number[] {
    if (root === null) return []

    const stack: TreeNode[] = [root]
    const res: number[] = []

    for (let idx = 0; idx < stack.length; idx++) {
        const curNode = stack[idx]

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

    let res: number[][] = []
    let curLevelStack: TreeNode[] = [root]

    while (curLevelStack.length > 0) {
        const tmp: number[] = []
        const nextLevelStack: TreeNode[] = []

        for (let idx = 0, len = curLevelStack.length; idx < len; idx++) {
            const curNode = curLevelStack[idx]

            tmp.push(curNode.val)

            if (curNode.left !== null) {
                nextLevelStack.push(curNode.left)
            }
            if (curNode.right !== null) {
                nextLevelStack.push(curNode.right)
            }
        }

        res.push(tmp)
        curLevelStack = nextLevelStack
    }

    return res
}

/**
 * 从下到上打印出二叉树的每个节点，
 * 同一层的节点按从左到右的顺序打印，每一层打印到一行
 */
export function levelOrderIII(root: TreeNode | null): number[][] {
    if (root === null) return []

    const generate = (root: TreeNode): [Map<number, number[]>, number] => {
        const map = new Map<number, number[]>()

        let depth: number = 1
        let curLevelStack: TreeNode[] = [root]

        for (; curLevelStack.length > 0; depth++) {
            const nextLevelStack: TreeNode[] = []

            for (let idx = 0, len = curLevelStack.length; idx < len; idx++) {
                const curNode = curLevelStack[idx]

                if (map.has(depth)) {
                    map.get(depth).push(curNode.val)
                } else {
                    map.set(depth, [curNode.val])
                }

                if (curNode.left !== null) {
                    nextLevelStack.push(curNode.left)
                }
                if (curNode.right !== null) {
                    nextLevelStack.push(curNode.right)
                }
            }

            curLevelStack = nextLevelStack
        }

        return [map, depth]
    }

    const transform = (map: Map<number, number[]>, depth: number): number[][] => {
        const ans: number[][] = []

        for (let d = depth - 1; d > 0; d--) {
            ans.push(map.get(d))
        }

        return ans
    }

    return transform.apply(null, generate(root))
}

/**
 * 请实现一个函数按照之字形顺序打印二叉树，
 * 即第一行按照从左到右的顺序打印，
 * 第二层按照从右到左的顺序打印，
 * 第三行再按照从左到右的顺序打印，
 * 其他行以此类推
 */
export function levelOrderIV(root: TreeNode | null): number[][] {
    if (root === null) return []

    let res: number[][] = []
    let curLevelStack: TreeNode[] = [root]

    for (let bool = true; curLevelStack.length > 0; bool = !bool) {
        const tmp: number[] = []
        const nextLevelStack: TreeNode[] = []
        const endIdx = curLevelStack.length - 1

        for (let idx = 0; idx <= endIdx; idx++) {
            const curNode = curLevelStack[idx]

            tmp[bool ? endIdx - idx : idx] = curNode.val

            if (curNode.left !== null) {
                nextLevelStack.push(curNode.left)
            }
            if (curNode.right !== null) {
                nextLevelStack.push(curNode.right)
            }
        }

        res.push(tmp)
        curLevelStack = nextLevelStack
    }

    return res
}
