import { LinkedListNode } from './interface'

// 反转链表
export default function reverseLinkedList(head: LinkedListNode | null): LinkedListNode | null {
    if (head === null) return null

    let pre = null
    let cur = head

    while (cur) {
        const curNext = cur.next

        cur = {
            value: cur.value,
            next: pre
        }

        pre = cur
        cur = curNext
    }

    return pre
}
