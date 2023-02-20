import { TreeNode } from './interface'

// 相同的二叉树 - 深度优先
export function isSameTreeRecursion(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null || q === null) {
        return p === q
    }

    if (p.val !== q.val) {
        return false
    }

    if (!isSameTreeRecursion(p.left, q.left)) {
        return false
    }

    if (!isSameTreeRecursion(p.right, q.right)) {
        return false
    }

    return true
}

// 相同的二叉树 - 广度优先
export function isSameTreeStack(p: TreeNode | null, q: TreeNode | null): boolean {
    function check(p: TreeNode | null, q: TreeNode | null): boolean {
        return p === null || q === null ? p !== q : false
    }

    function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
        if (p === null || q === null) {
            return p === q
        }

        const stackP: TreeNode[] = [p]
        const stackQ: TreeNode[] = [q]
        while (stackP.length > 0 && stackQ.length) {
            const nodeP = stackP.pop()
            const nodeQ = stackQ.pop()

            if (nodeP.val !== nodeQ.val) {
                return false
            }
            
            const leftP = nodeP.left
            const leftQ = nodeQ.left
            if (check(leftP, leftQ)) {
                return false
            }

            const rightP = nodeP.right
            const rightQ = nodeQ.right
            if (check(rightP, rightQ)) {
                return false
            }

            if (leftP !== null) {
                stackP.push(leftP)
            }
            if (leftQ !== null) {
                stackQ.push(leftQ)
            }

            if (rightP !== null) {
                stackP.push(rightP)
            }
            if (rightQ !== null) {
                stackQ.push(rightQ)
            }
        }
        
        return stackP.length === 0 && stackQ.length === 0
    }

    return isSameTree(p, q)
}
