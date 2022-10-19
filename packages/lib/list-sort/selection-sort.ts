import swap from './swap'

export default function selectionSort(list: number[]): number[] {
    if (list.length <= 1) return list

    for (let i = list.length - 1; i >= 0; i--) {
        let max = list[i]
        let maxIndex = i

        for (let j = i - 1; j >= 0; j--) {
            if (max >= list[j]) {
                continue
            }

            max = list[j]
            maxIndex = j
        }

        swap(list, i, maxIndex)
    }

    return list
}
