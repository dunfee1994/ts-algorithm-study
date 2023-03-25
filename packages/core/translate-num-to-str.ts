/**
 * 给定一个数字 num，我们按照如下规则把它翻译为字符串：
 *
 * 0 翻译成 'a'，1 翻译成 'b'，……，11 翻译成 'l'，……，25 翻译成 'z'
 *
 * @param {number} num 给定数字
 *
 * @returns {number} 不同翻译方法的种数
 */
export default function translateNumToStrCount(num: number): number {
    const numStr = num.toString()

    let p = 0, q = 0, ans = 1
    for (let i = 0, n = numStr.length - 1; i <= n; i++) {
        p = q, q = ans

        if (i === 0) continue

        const subNum = +numStr.substring(i - 1, i + 1)
        if (subNum >= 10 && subNum <= 25) {
            ans += p
        }
    }

    return ans
}
