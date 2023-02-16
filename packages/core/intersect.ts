/**
 * 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。
 * 返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。
 * 可以不考虑输出结果的顺序。
 * 
 * 方式一：map
 *
 * @param {number[]} nums1 整数数组1
 *
 * @param {number[]} nums2 整数数组2
 *
 * @returns {number[]} 两数组的交集
 */
export function intersectMap(nums1: number[], nums2: number[]): number[] {
    if (nums1.length > nums2.length) {
        return intersectMap(nums2, nums1)
    }

    const map = new Map()
    nums1.forEach(item => {
        map.set(item, map.has(item) ? map.get(item) + 1 : 1)
    })

    const res: number[] = []
    nums2.forEach(item => {
        if (!map.has(item)) return

        const count = map.get(item)
        if (count <= 0) return

        res.push(item)
        count > 1 ? map.set(item, count - 1) : map.delete(item)
    })
    return res
}

/**
 * 方式二：sort
 *
 * @param {number[]} nums1 整数数组1
 *
 * @param {number[]} nums2 整数数组2
 *
 * @returns {number[]} 两数组的交集
 */
export function intersectSort(nums1: number[], nums2: number[]): number[] {
    const sortCb = (a: number, b: number): number => a - b

    nums1 = nums1.sort(sortCb)
    nums2 = nums2.sort(sortCb)

    const len1 = nums1.length
    const len2 = nums2.length
    const res: number[] = []

    let i1 = 0
    let i2 = 0
    while (i1 < len1 && i2 < len2) {
        const num1 = nums1[i1]
        const num2 = nums2[i2]

        if (num1 !== num2) {
            num1 > num2 ? i2++ : i1++
        } else {
            res.push(num1)
            i1++
            i2++
        }
    }

    return res
}
