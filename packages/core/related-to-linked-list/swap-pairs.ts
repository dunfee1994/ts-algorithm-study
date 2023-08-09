import { LinkedListNode } from './interface'

/**
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点
 *
 * 你必须在不修改节点内部的值的情况下完成本题，只能进行节点交换
 *
 * @param head 给定链表头节点 `head`
 *
 * @returns 交换后链表的头节点
 */
export function swapPairsRecursion(head: LinkedListNode | null): LinkedListNode | null {
    if (!head || !head.next) return head

    const newHead = head.next

    head.next = swapPairsRecursion(newHead.next)
    newHead.next = head

    return newHead
}

/**
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点
 *
 * 你必须在不修改节点内部的值的情况下完成本题，只能进行节点交换
 *
 * @param head 给定链表头节点 `head`
 *
 * @returns 交换后链表的头节点
 */
export function swapPairsCycle(head: LinkedListNode | null): LinkedListNode | null {
    if (!head || !head.next) return head

    const preHead: LinkedListNode = {
        value: -1,
        next: head
    }

    for (let pre = preHead, cur = head; cur && cur.next;) {
        const next = cur.next
        const nextNext = next.next

        next.next = cur
        pre.next = next
        cur.next = nextNext

        pre = cur
        cur = nextNext
    }

    return preHead.next
}
