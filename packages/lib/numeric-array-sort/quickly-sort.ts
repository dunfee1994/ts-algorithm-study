import swap from './swap'

function partition(list: number[], left: number, right: number): number {
    const pivot = list[(left + right) / 2 >>> 0]

    let i = 0
    let j = right

    while (i <= j) {
        while (list[i] < pivot) i++

        while (list[j] > pivot) j--

        if (i <= j) {
            swap(list, i, j)
            i++
            j--
        }
    }

    return i
}

export default function quicklySort(list: number[], left: number = 0, right: number = list.length - 1): number[] {
    if (left >= right) return list

    const index = partition(list, left, right)
    
    if (left < index - 1) {
        quicklySort(list, left, index - 1)
    }

    if (right > index) {
        quicklySort(list, index, right)
    }

    return list
}
