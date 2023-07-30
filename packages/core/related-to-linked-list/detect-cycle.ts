import { LinkedListNode } from './interface'

/**
 * 给定一个链表的头节点 `head`，返回链表开始入环的第一个节点
 *
 * @param head 给定链表头节点 `head`
 *
 * @returns 链表有环则返回开始入环的第一个节点，无环则返回 `null`
 */
export default function detectCycle(head: LinkedListNode | null): LinkedListNode | null {
    if (!head || !head.next) {
        return null
    }

    let fast = head, slow = head

    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next

        if (fast === slow) {
            break
        }
    }

    if (!fast || !fast.next) {
        return null
    }

    for (slow = head; fast !== slow;) {
        fast = fast.next
        slow = slow.next
    }

    return slow
}
