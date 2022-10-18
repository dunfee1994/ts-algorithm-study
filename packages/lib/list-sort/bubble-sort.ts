import swap from './swap'

export default function bubbleSort(list: number[]): number[] {
    const len = list.length

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if (list[j + 1] < list[j]) {
                swap(list, j, j + 1)
            }
        }
    }

    return list
}
