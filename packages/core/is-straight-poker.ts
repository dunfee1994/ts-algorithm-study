/**
 * 从若干副扑克牌中随机抽 5 张牌，判断是不是顺子，即这 5 张牌是不是连续的。
 *
 * 提示：
 * 2～10为数字本身，A 为 1，J 为 11，Q 为 12，K 为 13，
 * 而大小王为 0，可以看成任意数字。
 * A 不能视为 14。
 *
 * @param {number[]} nums 五张扑克牌上的数字
 *
 * @returns {boolean} 是顺子则返回 true，否则返回 false
 */
export function isStraightPokerSort(nums: number[]): boolean {
    nums = nums.sort((a, b) => a - b)

    let joker = 0
    for (let i = 0; i <= 4; i++) {
        const num = nums[i]

        if (num === 0) {
            joker++
            continue
        }

        if (num === nums[i + 1]) {
            return false
        }
    }

    return nums[4] - nums[joker] <= 4
}

export function isStraightPokerFilter(nums: number[]): boolean {
    nums = nums.filter(num => num !== 0)

    if (new Set(nums).size !== nums.length) {
        return false
    }

    let max = 1, min = 13
    nums.forEach(num => {
        max = Math.max(max, num)
        min = Math.min(min, num)
    })
    return max - min <= 4
}
