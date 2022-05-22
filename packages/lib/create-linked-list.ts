export interface LinkedListNode {
    value: number
    next: LinkedListNode | null
}

// 创建链表
export default function createLinkedList(nums: number[] = []): LinkedListNode | null {
    const len = nums.length

    if (len === 0) return null

    let headNode: LinkedListNode = {
        value: nums[0],
        next: null
    }

    let pre = headNode
    for (let i = 1; i <= len - 1; i++) {
        const curNode: LinkedListNode = {
            value: nums[i],
            next: null
        }

        pre.next = curNode
        pre = curNode
    }

    return headNode
}
