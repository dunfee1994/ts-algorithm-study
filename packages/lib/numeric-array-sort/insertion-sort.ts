export default function insertionSort(list: number[]): number[] {
    const len = list.length

    if (len <= 1) return list

    for (let i = 1; i < len; i++) {
        const tmp = list[i]

        let j = i - 1
        while (j >= 0 && list[j] > tmp) {
            list[j + 1] = list[j]
            j--
        }

        list[j + 1] = tmp
    }

    return list
}
