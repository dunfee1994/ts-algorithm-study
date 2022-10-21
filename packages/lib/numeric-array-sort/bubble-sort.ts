import swap from './swap'

export default function bubbleSort(list: number[]): number[] {
    if (new Set(list).size <= 1) return list

    const len = list.length
    for (let i = len - 1; i >= 0; i--) {
        for (let j = len - 1; j >= len - i; j--) {
            if (list[j - 1] > list[j]) {
                swap(list, j, j - 1)
            }
        }
    }

    return list
}
