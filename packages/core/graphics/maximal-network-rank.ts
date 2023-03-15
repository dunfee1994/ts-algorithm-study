/**
 * 有 n 座城市和一些连接这些城市的道路 roads 共同组成一个基础设施网络
 * 每个 roads[i] = [ai, bi] 都表示在城市 ai 和 bi 之间有一条双向道路
 *
 * 两座不同城市构成的「城市对」的「网络秩」定义为：与这两座城市「直接」相连的道路总数
 * 如果存在一条道路直接连接这两座城市，则这条道路只计算一次
 *
 * 整个基础设施网络的「最大网络秩」是所有不同城市对中的「最大网络秩」
 * 
 * @param {number} n 城市数
 *
 * @param {number[][]} roads 道路
 *
 * @returns {number} 返回整个基础设施网络的「最大网络秩」
 */
export default function maximalNetworkRank(n: number, roads: number[][]): number {
    const degree = Array(n).fill(0)
    const connect = Array(n).fill(null).map(() => Array(n).fill(0))

    roads.forEach(([m, n]) => {
        degree[m]++
        degree[n]++

        connect[m][n] = 1
        connect[n][m] = 1
    })

    let max = 0

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            max = Math.max(max, degree[i] + degree[j] - connect[i][j])
        }
    }

    return max
}
