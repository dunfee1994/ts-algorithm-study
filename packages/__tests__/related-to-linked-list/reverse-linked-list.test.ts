import createLinkedList from '../../lib/related-to-linked-list/create-linked-list'
import reverseLinkedList from '../../lib/related-to-linked-list/reverse-linked-list'

describe('反转链表', () => {
    it('有多个节点的链表', () => {
        const head = createLinkedList([1, 2, 3, 4])
        const expected = createLinkedList([4, 3, 2, 1])

        // 期望得到想要的结果
        expect(reverseLinkedList(head)).toEqual(expected)
        // 期望对原链表不会造成影响
        expect(head).toEqual(createLinkedList([1, 2, 3, 4]))
    })

    it('有 1 个节点的链表', () => {
        const linkedList = createLinkedList([1])
        expect(reverseLinkedList(linkedList)).toEqual(linkedList)
    })

    it('有 0 个节点的链表', () => {
        expect(reverseLinkedList(null)).toBeNull()
    })
})
