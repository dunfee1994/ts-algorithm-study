/**
 * 交换字符使字符串相同
 *
 * 有两个长度相同且只由字符 x 和 y 组成的字符串 s1 和 s2，
 * 你需要通过「交换字符」的方式使两个字符串相同。
 *
 * 每次「交换字符」时，你都可以在两个字符串中各选一个字符进行交换。
 *
 * 交换只能发生在两个不同的字符串之间，绝对不能发生在一个字符串内部。
 * 也就是说，我们可以交换 s1[i] 和 s2[j]，但不能交换 s1[i] 和 s1[j]。
 *
 * @param {string} s1 字符串 s1
 * @param {string} s2 字符串 s2
 *
 * @returns {number} 使 s1 和 s2 相同的最小交换次数。如果没有办法能够使这两个字符串相同，则返回 -1
 */
export default function minimumSwap(s1: string, s2: string): number {
    if (s1 === s2) return 0

    let xy = 0, yx = 0
    for (let i = 0, len = s1.length; i < len; i++) {
        const s3 = s1.charAt(i) + s2.charAt(i)

        if (s3 === 'xy' || s3 === 'yx') {
            s3 === 'xy' ? xy++ : yx++
        }
    }

    if (((xy + yx) & 1) !== 0) return -1
    return (xy >> 1) + (yx >> 1) + (xy & 1 >> 0) + (yx & 1 >> 0)
}
