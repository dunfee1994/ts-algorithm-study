import { LinkedListNode } from './interface'

/**
 * 给你两个升序排序后的链表头节点 `head1` 和 `head2`
 *
 * 将它们保持原有顺序合并成一个新链表
 * 
 * @param head1 给定升序链表头节点 `head1`
 *
 * @param head2 给定升序链表头节点 `head2`
 *
 * @returns 新链表头部节点
 */
export function mergeTwoLinkedList(head1: LinkedListNode | null, head2: LinkedListNode | null): LinkedListNode | null {
    if (head1 === null || head2 === null) {
        return head1 || head2
    }

    const preHead: LinkedListNode = {
        value: -Number.MIN_SAFE_INTEGER,
        next: null
    }

    for (let pre = preHead; head1 !== null || head2 !== null; pre = pre.next) {
        if (head1 === null || head2 === null) {
            pre.next = head1 || head2
            break
        }

        const value1 = head1.value
        const value2 = head2.value

        pre.next = {
            value: Math.min(value1, value2),
            next: null
        }

        value1 < value2 ? head1 = head1.next : head2 = head2.next
    }

    return preHead.next
}

/**
 * 给你一个链表头节点集合 `heads`，其中所有链表均按升序排序
 *
 * 将它们保持原有顺序合并成一个新链表
 *
 * @param heads 给定升序链表头节点集合 `heads`
 *
 * @returns 新链表头部节点
 */
export function mergeKLinkedList(heads: Array<LinkedListNode | null>): LinkedListNode | null {
    return function merge(heads: Array<LinkedListNode | null>, l: number, r: number): LinkedListNode | null {
        if (l > r) return null
        if (l === r) return heads[l]

        const mid = l + (r - l >> 1)
        return mergeTwoLinkedList(merge(heads, l, mid), merge(heads, mid + 1, r))
    }(heads, 0, heads.length - 1)
}
