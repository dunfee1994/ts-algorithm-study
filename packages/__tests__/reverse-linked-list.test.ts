import createLinkedList from '../lib/create-linked-list'
import reverseLinkedList from '../lib/reverse-linked-list'

describe('反转链表', () => {
    it('有多个节点的链表', () => {
        const head = createLinkedList([1, 2, 3, 4])
        const expected = createLinkedList([4, 3, 2, 1])
        expect(reverseLinkedList(head)).toEqual(expected)
    })

    it('有 1 个节点的链表', () => {
        const linkedList = createLinkedList([1])
        expect(reverseLinkedList(linkedList)).toEqual(linkedList)
    })

    it('有 0 个节点的链表', () => {
        expect(reverseLinkedList(null)).toBeNull()
    })
})
