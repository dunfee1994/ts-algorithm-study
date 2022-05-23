import { LinkedListNode } from './create-linked-list'

interface ReverseLinkedListFn {
    (head: LinkedListNode | null): LinkedListNode | null
}

// 反转链表
const reverseLinkedList: ReverseLinkedListFn = function(head) {
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

export default reverseLinkedList
