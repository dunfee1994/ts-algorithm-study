/**
 * 给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数。
 * 我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。
 * 所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」。
 *
 * @param {number[]} hours 员工每天工作的工作时间表
 *
 * @returns {number}「表现良好时间段」的最长持续天数
 */
export function longestWPI(hours: number[]): number {
    const map = new Map()

    let s = 0
    let res = 0
    for (let i = 0, n = hours.length; i < n; i++) {
        s += hours[i] > 8 ? 1 : -1

        if (s > 0) {
            res = Math.max(res, i + 1)
        } else if (map.has(s - 1)) {
            res = Math.max(res, i - map.get(s - 1))
        }

        if (!map.has(s)) {
            map.set(s, i)
        }
    }

    return res
}
