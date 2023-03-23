/**
 * 输入两棵二叉树 a 和 b，判断 b 是不是 a 的子结构
 *
 * 提示：
 * 1. 约定空树不是任意一个树的子结构
 * 2. 若 a 中有出现和 b 相同的结构和节点值，则 b 是 a 的子结构
 */
export default function isSubStructure(a: TreeNode | null, b: TreeNode | null): boolean {
    function dfs(c: TreeNode | null, d: TreeNode | null): boolean {
        if (d === null) return true
        if (c === null) return false
        if (c.val !== d.val) return false
        return dfs(c.left, d.left) && dfs(c.right, d.right)
    }

    return function check(a: TreeNode | null, b: TreeNode | null): boolean {
        if (a === null || b === null) return false
        return dfs(a, b) || check(a.left, b) || check(a.right, b)
    }(a, b)
}
