function idx(c: string): number {
    return ['Q', 'W', 'E', 'R'].indexOf(c)
}

function check(cnt: number[], partial: number): boolean {
    return cnt.every(item => item === partial)
}

/**
 * 给定一个只包含 'Q', 'W', 'E', 'R' 四种字符且长度为 n 的字符串 s
 *
 * 假如在该字符串中，这四个字符都恰好出现 n/4 次，那么它就是一个「平衡字符串」
 * 给你一个这样的字符串 s，请通过「替换一个子串」的方式，使原字符串 s 变成一个「平衡字符串」
 *
 * 你可以用和「待替换子串」长度相同的任何其他字符串来完成替换
 * 请返回待替换子串的最小可能长度
 *
 * 如果原字符串自身就是一个平衡字符串，则返回 0
 * 
 * @param {string} s 给定字符串
 *
 * @returns {number} 待替换子串的最小可能长度
 */
export function balancedString(s: string): number {
    const times = 4
    const len = s.length

    const cnt: number[] = Array(times).fill(0)
    for (let i = 0; i < len; i++) cnt[idx(s[i])]++

    const partial = len / times
    if (check(cnt, partial)) return 0

    let res = len
    for (let left = 0, right = 0; left < len; left++) {
        while(right < len && !check(cnt, partial)) {
            cnt[idx(s[right])]--
            right++
        }

        if (!check(cnt, partial)) break

        res = Math.min(res, right - left)
        cnt[idx(s[left])]++
    }

    return res
}
