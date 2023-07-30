import { LinkedListNode } from './interface'

/**
 * 给你一个链表的头节点 `head`，判断链表中是否有环
 *
 * 如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环
 *
 * @param head 给定链表头节点 `head`
 *
 * @returns 如果链表中存在环，则返回 `true`，否则返回 `false`
 */
export default function hasCycle(head: LinkedListNode | null): boolean {
    if (!head || !head.next) {
        return false
    }

    for (let slow = head, fast = head; fast && fast.next;) {
        fast = fast.next.next
        slow = slow.next

        if (fast === slow) {
            return true
        }
    }

    return false
}

/** 判断链表中是否有环 - 第二种实现 */
export function hasCycleTwo(head: LinkedListNode | null): boolean {
    if (!head || !head.next) {
        return false
    }

    for (let slow = head, fast = head.next; fast !== slow;) {
        if (!fast || !fast.next) {
            return false
        }

        fast = fast.next.next
        slow = slow.next
    }

    return true
}
