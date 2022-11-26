/**
 * 给你两个整数数组 `nums` 和 `index`。你需要按照以下规则创建目标数组：
 *
 * 1. 目标数组 `target` 最初为空。
 * 2. 按从左到右的顺序依次读取 `nums[i]` 和 `index[i]`，在 `target` 数组中的下标 `index[i]` 处插入值 `nums[i]` 。
 * 3. 重复上一步，直到在 `nums` 和 `index` 中都没有要读取的元素。
 *
 * 请你返回目标数组。
 *
 * 题目保证数字插入位置总是存在。
 */

// 借用 `Array.prototype.splice` 方法
export function createTargetArrayOne(nums: number[], index: number[]): number[] {
    const target: number[] = []

    const endIndex = nums.length - 1
    for (let i = 0; i <= endIndex; i++) {
        target.splice(index[i], 0, nums[i])
    }

    return target
}

export function createTargetArrayTwo(nums: number[], index: number[]): number[] {
    const target: number[] = [...nums]

    const endIndex = nums.length - 1
    for (let i = 0; i <= endIndex; i++) {
        if (i > index[i]) {
            const tmp = nums[i]
            const idx = index[i]

            for (let j = i - 1; j >= idx; j--) {
                target[j + 1] = target[j]
            }

            target[idx] = tmp
        }
    }

    return target
}
