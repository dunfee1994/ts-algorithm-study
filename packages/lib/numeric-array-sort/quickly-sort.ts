import swap from './swap'

function partition(list: number[], left: number, right: number): number {
    const pivot = list[(left + right) / 2 >>> 0]

    while (left <= right) {
        while (list[left] < pivot) left++
        
        while (list[right] > pivot) right--

        left <= right && swap(list, left++, right--)
    }

    return left
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
