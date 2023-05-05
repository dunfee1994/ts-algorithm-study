import MinHeap from './min-heap'

export default class KthLargest {
    k: number
    heap: MinHeap

    constructor(k: number, nums: number[]) {
        this.k = k
        this.heap = new MinHeap()

        for (let i = 0, n = nums.length; i < n; i++) {
            this.add(nums[i])
        }
    }

    add(num: number): number {
        this.heap.offer(num)

        if (this.heap.size > this.k) {
            this.heap.poll()
        }

        return this.heap.peek()
    }
}
