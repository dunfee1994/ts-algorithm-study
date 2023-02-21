/**
 * 判断一个正整数 num 是不是快乐数。
 * 
 * 定义为：
 * 1. 对于一个正整数 num，每一次将该数替换为它每个位置上的数字的平方和。
 * 2. 然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。
 * 3. 如果这个过程结果为 1，那么这个数 num 就是快乐数。
 *
 * @param {number} num 正整数
 *
 * @returns {boolean} 如果 num 是快乐数就返回 true，否则返回 false
 */
export default function isHappyNumber(num: number): boolean {
    const set = new Set()

    let sum = num
    while (sum > 2 && !set.has(sum)) {
        const str = sum.toString()

        set.add(sum)
        sum = 0

        for (let i = 0, len = str.length; i < len; i++) {
            sum += Math.pow(+str[i], 2)
        }
    }

    return sum === 1
}
