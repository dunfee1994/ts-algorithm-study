type DfsFn<T = any> = (idx: T, informTimes: T[], g: Map<T, T[]>) => T

/**
 * 公司里有 n 名员工，
 * 每个员工的 ID 都是独一无二的，编号从 0 到 n - 1
 *
 * 公司的总负责人通过 headID 进行标识
 *
 * 在 managers 数组中，每个员工都有一个直属负责人，
 * 其中 managers[i] 是第 i 名员工的直属负责人
 * 对于总负责人，managers[headID] = -1
 *
 * 公司总负责人想要向公司所有员工通告一条紧急消息
 * 他将会首先通知他的直属下属们，然后由这些下属通知他们的下属，直到所有的员工都得知这条紧急消息
 *
 * 第 i 名员工需要 informTimes[i] 分钟来通知它的所有直属下属
 * 也就是说在 informTimes[i] 分钟后，他的所有直属下属都可以开始传播这一消息
 *
 * 提示：题目保证从属关系可以用树结构显示
 *
 * @param {number} n 公司的员工数量
 *
 * @param {number} headID 公司总负责人的 ID
 *
 * @param {number[]} managers managers 数组
 *
 * @param {number[]} informTimes informTimes 数组
 *
 * @returns {number} 返回通知所有员工这一紧急消息所需要的分钟数
 */
export default function numOfMinutes(n: number, headID: number, managers: number[], informTimes: number[]): number {
    const g: Map<number, number[]> = new Map()
    const dfs: DfsFn<number> = (idx, informTimes, g) => {
        let res = 0

        const neighbors = g.get(idx) || []
        for (let i = 0, len = neighbors.length; i < len; i++) {
            res = Math.max(res, dfs(neighbors[i], informTimes, g))
        }

        return informTimes[idx] + res
    }

    for (let i = 0; i < n; i++) {
        const manager = managers[i]
        g.has(manager) ? g.get(manager).push(i) : g.set(manager, [i])
    }

    return dfs(headID, informTimes, g)
}
