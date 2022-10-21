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

export default function quicklySort(list: number[]): number[] {
    return function _quicklySort(list: number[], left: number, right: number): number[] {
        if (left >= right || new Set(list).size <= 1) return list

        const index = partition(list, left, right)

        if (left < index - 1) {
            _quicklySort(list, left, index - 1)
        }

        if (right > index) {
            _quicklySort(list, index, right)
        }

        return list
    }(list, 0, list.length - 1)
}
