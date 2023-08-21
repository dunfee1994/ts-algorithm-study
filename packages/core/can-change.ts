const VACANCY_CHAR = '_'
const LEFT_CHAR = 'L'
const RIGHT_CHAR = 'R'

/**
 * 给你两个字符串 `start` 和 `target`，长度均为 `n`
 *
 * 每个字符串 `仅` 由字符 `'L'`、`'R'` 和 `'_'` 组成
 *
 * 其中字符 `'L'` 和 `'R'` 表示片段，字符 `'_'` 表示可以被任意 `'L'` 或 `'R'` 片段占据的 `空位`
 *
 * 片段 `'L'` 只有在其左侧直接存在一个 `空位` 时才能向 `左` 移动
 *
 * 片段 `'R'` 只有在其右侧直接存在一个 `空位` 时才能向 `右` 移动
 * 
 * @param start 给定字符串 `start`
 *
 * @param target 给定字符串 `target`
 *
 * @returns 如果在移动字符串 `start` 中的片段任意次之后可以得到字符串 `target`，返回 `true`；否则返回 `false`
 */
export default function canChange(start: string, target: string): boolean {
    const n = start.length

    let i = 0, j = 0
    while (i < n && j < n) {
        while (i < n && VACANCY_CHAR === start.charAt(i)) i++
        while (j < n && VACANCY_CHAR === target.charAt(j)) j++

        if (i < n && j < n) {
            const char = start.charAt(i)

            if (char !== target.charAt(j)) return false
            if (LEFT_CHAR === char && i < j) return false
            if (RIGHT_CHAR === char && i > j) return false

            i++, j++
        }
    }

    for(; i < n; i++) {
        if (VACANCY_CHAR !== start.charAt(i)) return false
    }

    for (; j < n; j++) {
        if (VACANCY_CHAR !== target.charAt(j)) return false
    }

    return true
}