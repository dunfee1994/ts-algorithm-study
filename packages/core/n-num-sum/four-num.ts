/** 数值四元组 */
type NumericQuadrupleType = [number, number, number, number]

/**
 * 给你一个整数数组 `nums` 和一个目标值 `target`
 *
 * 请你找出并返回满足下述全部条件且不重复的四元组 `[nums[a], nums[b], nums[c], nums[d]]`
 *
 * 1. `0 <= a, b, c, d <= nums.length`
 *
 * 2. `a`、`b`、`c` 和 `d` 互不相同
 *
 * 3. `nums[a] + nums[b] + nums[c] + nums[d] == target`
 *
 * 提示：若两个四元组元素一一对应，则认为这两个四元组重复
 *
 * @param nums 给定的整数数组 `nums`
 *
 * @param target 给定的目标值 `target`
 *
 * @returns 所有满足条件且不重复的四元组
 */
export function fourSum(nums: number[], target: number): NumericQuadrupleType[] {
    const right = nums.length - 1

    const result: NumericQuadrupleType[] = []
    if (right < 3) return result

    nums.sort((a, b) => b - a)

    for (let i = 0, endI = right - 3; i <= endI; i++) {
        const iNum = nums[i]
        if (i > 0 && iNum === nums[i - 1]) continue

        const startJ = i + 1
        const threeSumTarget = target - iNum
        const rightTwoSum = nums[right - 1] + nums[right]
        if (nums[right - 2] > threeSumTarget - rightTwoSum) continue
        if (nums[startJ] + nums[startJ + 1] + nums[startJ + 2] < threeSumTarget) break

        for (let j = startJ, endJ = right - 2; j <= endJ; j++) {
            const jNum = nums[j]
            if (j > startJ && jNum === nums[j - 1]) continue

            const left = j + 1
            const twoSumTarget = threeSumTarget - jNum
            if (rightTwoSum > twoSumTarget) continue
            if (nums[left] + nums[left + 1] < twoSumTarget) break

            for (let l = left, r = right; l < r; l++) {
                const lNum = nums[l]
                if (l > left && lNum === nums[l - 1]) continue

                while (r > l && nums[r] < twoSumTarget - lNum) r--
                if (l === r) break

                const rNum = nums[r]
                if (lNum + rNum === twoSumTarget) {
                    result.push([lNum, rNum, jNum, iNum])
                }
            }
        }
    }

    return result
}
