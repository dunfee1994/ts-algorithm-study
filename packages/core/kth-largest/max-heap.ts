import AbstractHeap from './abstract-heap'

export default class MaxHeap<T extends number | string = number> extends AbstractHeap<T> {
    readonly comparator = (a: T, b: T) => a <= b ? a === b ? 0 : 1 : -1

    constructor(data?: T[]) {
        super(data)
        this.heapify()
    }
}
