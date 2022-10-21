export default function insertionSort(list: number[]): number[] {
    if (new Set(list).size <= 1) return list

    const endIndex = list.length - 1
    for (let i = endIndex; i >= 0; i--) {
        const tmp = list[i]

        let j = i + 1
        while (j <= endIndex && list[j] < tmp) {
            list[j - 1] = list[j++]
        }

        list[j - 1] = tmp
    }

    return list
}
