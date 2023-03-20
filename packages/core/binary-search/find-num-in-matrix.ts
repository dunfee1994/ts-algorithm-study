/**
 * 在一个 m * n 的二维数组中，每一行都按照从左到右 非递减 的顺序排序，每一列都按照从上到下 非递减 的顺序排序。
 * 请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 *
 * @param {number[][]} matrix 二维数组
 *
 * @param {number} target 目标整数
 *
 * @return {boolean} 若二维数组中含有目标整数则返回 true，否则返回 false
 */
export function findNumInMatrixOne(matrix: number[][], target: number): boolean {
    // 时间复杂度：O(m * n)
    return matrix.some(row => row.includes(target))
}

export function findNumInMatrixTwo(matrix: number[][], target: number): boolean {
    // 时间复杂度：O(m * log(n))
    function search(nums: number[], target: number): boolean {
        for (let l = 0, r = nums.length; l <= r;) {
            const mid = l + (r - l >> 1)
            const midNum = nums[mid]

            if (target === midNum) {
                return true
            }

            target > midNum ? l = mid + 1 : r = mid - 1
        }

        return false
    }
    
    return matrix.some(row => search(row, target))
}

export function findNumInMatrixThree(matrix: number[][], target: number): boolean {
    // 时间复杂度：O(m + n)
    if (matrix.length === 0) {
        return false
    }

    const maxI = matrix.length - 1
    const maxJ = matrix[0].length - 1
    for (let i = 0, j = maxJ; i <= maxI && j >= 0;) {
        const num = matrix[i][j]

        if (target === num) {
            return true
        }

        target > num ? i++ : j--
    }

    return false
}
