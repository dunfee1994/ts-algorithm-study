// 在长度 2N 的数组中找出重复 N 次的元素
export default function repeatedNTimes(nums: number[]): number {
    const set: Set<number> = new Set()

    for (let i = 0, len = nums.length; i < len; i++) {
        const item = nums[i]
        if (set.has(item)) {
            return item
        }
        set.add(item)
    }

    return -1
}
