import { LinkedListNode } from './interface'

/**
 * 给定一个单链表 `L` 的头节点 `head`，单链表 `L` 表示为：
 *
 * `L0 → L1 → … → Ln - 1 → Ln`
 *
 * 请将其重新排列后变为：
 *
 * `L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …`
 *
 * 提示：不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换
 *
 * @param 给定的单链表 `L` 的头节点 `head`
 *
 * @returns {void} 无返回值
 */
export default function reorderLinkedList(head: LinkedListNode | null): void {
    if (head === null || head.next === null) {
        return
    }

    let node = head
    for (let fast = head; fast !== null && fast.next !== null;) {
        node = node.next
        fast = fast.next.next
    }

    let right: LinkedListNode | null = null
    while (node !== null) {
        const next = node.next

        node.next = right
        right = node
        node = next
    }

    let pre: LinkedListNode = {
        value: -1,
        next: head
    }

    for (let left = head; right !== null && left !== right;) {
        const leftNext = left.next

        pre.next = left
        pre = pre.next

        pre.next = right
        pre = pre.next

        left = leftNext
        right = right.next
    }
}

/** 重排链表 - 第二种实现 */
export function reorderLinkedListTwo(head: LinkedListNode | null): void {
    if (head === null || head.next === null) {
        return
    }

    const stack: LinkedListNode[] = []
    for (let node = head; node !== null; node = node.next) {
        stack.push(node)
    }

    let pre: LinkedListNode = {
        value: -1,
        next: head
    }

    let l = 0, r = stack.length - 1
    while (l < r) {
        pre.next = stack[l++]
        pre = pre.next

        pre.next = stack[r--]
        pre = pre.next
    }

    if (l === r) {
        pre.next = stack[l]
        pre = pre.next
    }

    pre.next = null
}
