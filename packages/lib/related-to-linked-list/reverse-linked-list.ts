import { LinkedListNode } from './create-linked-list'

// 反转链表
export default function reverseLinkedList(head: LinkedListNode | null): LinkedListNode | null {
    if (head === null) return null

    let pre = null
    let cur = head

    while (cur) {
        let next = cur.next

        cur.next = pre
        pre = cur

        cur = next
    }

    return pre
}
