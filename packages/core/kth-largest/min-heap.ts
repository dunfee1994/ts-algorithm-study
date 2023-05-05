export default class MinHeap {
    readonly data: number[]
    #comparator = (a: number, b: number): number => a - b

    constructor(data: number[] = []) {
        this.data = data
    
        this.heapify()
    }

    peek(): number | null {
        return this.size > 0 ? this.data[0] : null
    }

    offer(value: number) {
        this.data.push(value)
        this.bubbleUp(this.size - 1)
    }

    poll() {
        if (this.size === 0) {
            return null
        }

        const result = this.data[0]
        const last = this.data.pop()

        if (this.size > 0) {
            this.data[0] = last
            this.bubbleDown(0)
        }

        return result
    }

    private bubbleUp(index: number) {
        for (let parentIndex = index; index > 0; index = parentIndex) {
            parentIndex = (index - 1) >> 1

            if (this.compare(index, parentIndex) >= 0) {
                break
            }

            this.swap(index, parentIndex)
        }
    }

    private bubbleDown(index: number) {
        const lastIndex = this.size - 1

        for (let findIndex = index; true; index = findIndex) {
            const leftIndex = (index << 1) + 1
            const rightIndex = (index << 1) + 2

            if (leftIndex <= lastIndex && this.compare(leftIndex, findIndex) < 0) {
                findIndex = leftIndex
            }

            if (rightIndex <= lastIndex && this.compare(rightIndex, findIndex) < 0) {
                findIndex = rightIndex
            }

            if (index === findIndex) break

            this.swap(index, findIndex)
        }
    }

    private heapify() {
        if (this.size < 2) return

        for (let i = 1, size = this.size; i < size; i++) {
            this.bubbleUp(i)
        }
    }

    private compare(i: number, j: number): number {
        return this.#comparator(this.data[i], this.data[j])
    }

    private swap(i: number, j: number) {
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]]
    }

    get size(): number {
        return this.data.length
    }
}
