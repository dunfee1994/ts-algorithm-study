export default abstract class AbstractHeap<T> {
    readonly data: T[] = []
    abstract readonly comparator: (a: T, b: T) => number

    constructor(data: T[] = []) {
        this.data = data || []
    }

    peek(): T | null {
        return this.size > 0 ? this.data[0] : null
    }

    offer(value: T) {
        this.data.push(value)
        this.bubbleUp(this.size - 1)
    }

    poll(): T | null {
        if (this.size === 0) return null

        const ans = this.data[0]
        const last = this.data.pop()

        if (this.size > 0) {
            this.data[0] = last
            this.bubbleDown(0)
        }

        return ans
    }

    heapify() {
        for (let idx = 1; idx < this.size; idx++) {
            this.bubbleUp(idx)
        }
    }

    private bubbleUp(idx: number) {
        for (let preHalfIdx = idx; idx > 0; idx = preHalfIdx) {
            preHalfIdx = (idx - 1) >> 1

            if (this.compare(idx, preHalfIdx) >= 0) break

            this.swap(idx, preHalfIdx)
        }
    }

    private bubbleDown(idx: number) {
        for (let findIdx = idx, lastIdx = this.size - 1; true; idx = findIdx) {
            const dblIdx = idx << 1
            const leftIdx = dblIdx + 1
            const rightIdx = dblIdx + 2

            if (leftIdx <= lastIdx && this.compare(leftIdx, findIdx) < 0) {
                findIdx = leftIdx
            }

            if (rightIdx <= lastIdx && this.compare(rightIdx, findIdx) < 0) {
                findIdx = rightIdx
            }

            if (idx === findIdx) break

            this.swap(idx, findIdx)
        }
    }

    private compare(i: number, j: number): number {
        return this.comparator(this.data[i], this.data[j])
    }

    private swap(i: number, j: number) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]]
    }

    get size(): number {
        return this.data.length
    }
}
