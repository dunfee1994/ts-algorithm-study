/**
 * 给你一个整数数组 `nums`
 *
 * 判断是否存在三元组 `[nums[i], nums[j], nums[k]]`
 * 满足 `i != j`、`i != k`、`j != k` 同时还满足 `nums[i] + nums[j] + nums[k] == 0`
 *
 * 请你返回所有和为 `0` 且不重复的三元组
 *
 * @param nums 给定的整数数组 `nums`
 *
 * @returns 所有和为 `0` 且不重复的三元组
 */
export function threeSum(nums: number[]): [number, number, number][] {
    const right = nums.length - 1

    const result: [number, number, number][] = []
    if (right < 2) return result

    nums.sort((a, b) => b - a)

    for (let i = 0, endI = right - 2; i <= endI; i++) {
        const num = nums[i]
        if (i > 0 && num === nums[i - 1]) continue

        const left = i + 1
        const target = -num
        if (nums[left] + nums[left + 1] < target) break
        if (nums[right - 1] + nums[right] > target) continue

        for (let l = left, r = right; l < r; l++) {
            const lNum = nums[l]
            if (l > left && lNum === nums[l - 1]) continue

            while (r > l && nums[r] + lNum < target) r--
            if (l == r) break

            const rNum = nums[r]
            if (lNum + rNum === target) {
                result.push([lNum, rNum, num])
            }
        }
    }

    return result
}

/**
 * 给你一个整数数组 `nums` 和一个目标值 `target`
 *
 * 请你从 `nums` 中选出三个整数，是它们的和与 `target` 最接近，并返回它们的和
 *
 * 提示：假定每组输入只存在恰好一个解
 *
 * @param nums 给定的整数数组 `nums`
 *
 * @param target 给定的目标值 `target`
 *
 * @returns 与 `target` 最接近的（三个整数）和
 */
export function threeSumClosest(nums: number[], target: number): number {
    const right = nums.length - 1

    nums.sort((a, b) => b - a)

    let result = Number.MAX_SAFE_INTEGER
    for (let i = 0, endI = right - 2; i <= endI; i++) {
        const num = nums[i]
        if (i > 0 && num === nums[i - 1]) continue

        const left = i + 1
        for (let l = left, r = right; l < r;) {
            const lNum = nums[l]
            if (l > left && lNum === nums[l - 1]) {
                l++
                continue
            }

            const lrSum = num + nums[l] + nums[r]
            if (lrSum === target) return target
            if (Math.abs(lrSum - target) < Math.abs(result - target)) {
                result = lrSum
            }

            lrSum > target ? l++ : r--
        }
    }
    return result
}
