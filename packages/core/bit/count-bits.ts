import { hammingWeightOne } from './hamming-weight'

/**
 * 给你一个整数 n，
 * 对于 0 <= i <= n 中的每个 i，计算其二进制表示中 1 的个数，
 * 统计在一个长度为 n + 1 的数组 ans 中作为答案返回。
 *
 * @param {number} n 整数 n
 *
 * @returns {number[]} 答案 ans
 */
export function countBitsOne(n: number): number[] {
    const ans: number[] = []

    for (let i = 0; i <= n; i++) {
        ans.push(hammingWeightOne(i))
    }

    return ans
}

/**
 * 很容易就能实现时间复杂度为 O(n log n) 的解决方案，
 * 你可以在线性时间复杂度 O(n) 内用一趟扫描解决此问题吗？
 */
export function countBitsTwo(n: number): number[] {
    const ans: number[] = [0, 1]
    if (n < 2) {
        return ans.slice(0, n + 1)
    }

    for (let i = 2; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1)
    }
    return ans
}

export function countBitsThree(n: number): number[] {
    const ans: number[] = [0, 1]
    if (n < 2) {
        return ans.slice(0, n + 1)
    }

    for (let i = 2, isOdd = false; i <= n; i++, isOdd = !isOdd) {
        ans[i] = isOdd ? ans[i - 1] + 1 : ans[i >> 1]
    }
    return ans
}
