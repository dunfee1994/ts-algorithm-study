export default function insertionSort(list: number[]): number[] {
    if (new Set(list).size <= 1) return list

    const endIndex = list.length - 1
    for (let i = endIndex - 1; i >= 0; i--) {
        const tmp = list[i]

        let j = i + 1
        while (j <= endIndex && list[j] < tmp) {
            list[j - 1] = list[j++]
        }

        list[j - 1] = tmp
    }

    return list
}

// 优化版
export function insertionSortOptimized(list: number[]): number[] {
    if (new Set(list).size <= 1) return list

    const endIndex = list.length - 1
    for (let i = endIndex - 1; i >= 0; i--) {
        const tmp = list[i]

        let r = endIndex
        for (let l = i + 1; l <= r;) {
            const mid = l + (r - l >> 1)
            const midVal = list[mid]

            if (midVal >= tmp) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }

        for (let j = i + 1; j <= r; j++) {
            list[j - 1] = list[j]
        }
        list[r] = tmp
    }

    return list
}
