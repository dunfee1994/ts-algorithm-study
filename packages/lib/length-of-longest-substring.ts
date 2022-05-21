// 找出字符串 str 其中不含有重复字符的 最长子串 的长度
export default function lengthOfLongestSubstring(str: string): number {
    const len: number = str.length
    const set: Set<string> = new Set()

    let j: number = -1
    let res: number = 0

    for (let i = 0; i < len; i++) {
        if (i > 0) {
            set.delete(str.charAt(i - 1))
        }
        while (j + 1 < len && !set.has(str.charAt(j + 1))) {
            set.add(str.charAt(j + 1))
            j++
        }

        res = Math.max(res, j - i + 1)
    }

    return res
}
