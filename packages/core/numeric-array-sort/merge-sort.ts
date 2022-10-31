function merge(leftList: number[], rightList: number[]): number[] {
    const res: number[] = []

    const leftLen = leftList.length
    const rightLen = rightList.length

    let leftIndex = 0
    let rightIndex = 0

    while (leftIndex < leftLen && rightIndex < rightLen) {
        if (leftList[leftIndex] < rightList[rightIndex]) {
            res.push(leftList[leftIndex++])
        } else {
            res.push(rightList[rightIndex++])
        }
    }

    while (leftIndex < leftLen) {
        res.push(leftList[leftIndex++])
    }

    while (rightIndex < rightLen) {
        res.push(rightList[rightIndex++])
    }

    return res
}

export default function mergeSort(list: number[]): number[] {
    if (new Set(list).size <= 1) return list

    const midIndex = list.length / 2 >>> 0

    const rightList = list.slice(midIndex)
    const leftList = list.slice(0, midIndex)

    return merge(mergeSort(leftList), mergeSort(rightList))
}
